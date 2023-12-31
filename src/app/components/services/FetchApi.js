import supabase from "../../../../netlify-functions/supabase";

export async function fetchPosts() {
  let { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }

  return posts;
}

export async function fetchPostById(id) {
  let { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("post_id", id);
  if (error) {
    throw error;
  }

  let { data: comments, error: commentErr } = await supabase
    .from("comment")
    .select("*")
    .eq("post_id", id);

  if (commentErr) {
    throw commentErr;
  }

  return {
    post: post[0] ? post[0] : null,
    comments,
  };
}

export async function uploadFile(file, userId) {
  const filePath = `${userId}/${file.name}`;

  const { error } = await supabase.storage.from("image").upload(filePath, file);

  if (error) {
    console.error("Error uploading file:", error);
    return false;
  }

  return true;
}

// export async function removeFile(fileName, userId) {
//   const filePath = `${userId}/${fileName}`;

//   const { error } = await supabase.storage.from("image").remove([filePath]);

//   if (error) {
//     console.error("Error removing file:", error);
//     return false;
//   }

//   return true;
// }

export async function createPost(data) {
  const { title, content, flags, imageUrl, secretKey, userId } = data;

  let isSuccess = true;

  if (data.imageFile) {
    isSuccess = await uploadFile(data.imageFile, userId);
  }

  const imageName = data.imageFile?.name || "";

  if (isSuccess) {
    const { error } = await supabase.from("posts").insert([
      {
        title,
        content,
        secret_key: secretKey,
        url: imageUrl,
        type: flags,
        user_id: userId,
        image_name: imageName,
      },
    ]);

    if (error) {
      console.error("Error create post:", error);
      throw error;
    }

    return null;
  }
}

export async function createUser(id) {
  const { error } = await supabase.from("user").insert([{ user_id: id }]);

  if (error) {
    console.error("Error create user:", error);
    return null;
  }
}

export async function updatePost(data) {
  const { title, content, flags, imageUrl, secretKey, userId, postId } = data;

  let isSuccess = true;

  if (data.imageFile) {
    isSuccess = uploadFile(data.imageFile, userId);
  }

  const imageName = data.imageFile?.name || "";

  if (isSuccess) {
    const { error } = await supabase
      .from("posts")
      .update({
        title,
        content,
        secret_key: secretKey,
        url: imageUrl,
        type: flags,
        user_id: userId,
        image_name: imageName,
      })
      .eq("post_id", postId);

    if (error) {
      console.error("Error update post:", error);
      throw error;
    }
  }
  return null;
}

export async function createComment(postId, userId, content) {
  const { error } = await supabase
    .from("comment")
    .insert([{ post_id: postId, user_id: userId, content }]);

  if (error) {
    console.error("Error create comment:", error);
    throw error;
  }

  return null;
}

export async function editComment(commentId, newContent) {
  const { error } = await supabase
    .from("comment")
    .update([{ content: newContent }])
    .eq("comment_id", commentId);

  if (error) {
    throw error;
  }

  return null;
}

export async function deleteComment(commentId) {
  const { error } = await supabase
    .from("comment")
    .delete()
    .eq("comment_id", commentId);

  if (error) {
    throw error;
  }

  return null;
}

export async function updatePostUpVote(postId, newVote) {
  const { error } = await supabase
    .from("posts")
    .update({ upvote: newVote })
    .eq("post_id", postId);

  if (error) {
    throw error;
  }

  return null;
}

export async function updateVoteComment(commentId, newVote) {
  const { error } = await supabase
    .from("comment")
    .update({ upvote: newVote })
    .eq("comment_id", commentId);

  if (error) {
    throw error;
  }

  return null;
}

export async function deletePost(postId) {
  const { error } = await supabase.from("posts").delete().eq("post_id", postId);

  if (error) {
    throw error;
  }

  return null;
}

export async function checkId(id) {
  let { data: userId, error } = await supabase
    .from("user")
    .select("user_id")
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching user ID:", error);
    return null;
  }

  return userId;
}

export async function fetchMyPosts(id) {
  let { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", id);
  if (error) {
    throw error;
  }

  return posts;
}

export async function fetchMyComments(id) {
  let { data: posts, error } = await supabase
    .from("comment")
    .select("*")
    .eq("user_id", id);
  if (error) {
    throw error;
  }

  return posts;
}

export async function sharePost(data) {
  const {
    title,
    content,
    secretKey,
    postId: postIdSharedFrom,
    userId,
    flags,
    url,
  } = data;
  const { error } = await supabase.from("posts").insert([
    {
      title,
      content,
      secret_key: secretKey,
      share_from_post_id: postIdSharedFrom,
      user_id: userId,
      type: flags,
      url,
      image_name: "",
    },
  ]);

  if (error) {
    console.error("Error on sharing post:", error);
    throw error;
  }

  return null;
}

export async function getAllUsers() {
  let { data, error } = await supabase.from("user").select("user_id");
  if (error) {
    throw error;
  }

  return data;
}

export async function getMessageBetweenTwoIds(firstId, secondId) {
  const { data, error } = await supabase
    .from("message")
    .select("*")
    .or(
      `and(sender_id.eq.${firstId},receiver_id.eq.${secondId}),and(sender_id.eq.${secondId},receiver_id.eq.${firstId})`
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export function subscribeToConversation(
  currentUser,
  otherUser,
  setNewMessages
) {
  const channelId =
    currentUser < otherUser
      ? `${currentUser}${otherUser}`
      : `${otherUser}${currentUser}`;

  const subscription = supabase
    .channel(channelId)
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "message" },
      (payload) => {
        setNewMessages((prevMessages) => [payload.new, ...prevMessages]);
      }
    )
    .subscribe();

  // Return a cleanup function
  return () => subscription.unsubscribe();
}

export async function sendMessage(content, senderId, receiverId) {
  const { data, error } = await supabase
    .from("message")
    .insert([
      { content: content, sender_id: senderId, receiver_id: receiverId },
    ]);

  if (error) {
    console.error("Error sending message:", error);
    throw error;
  }

  return data;
}
