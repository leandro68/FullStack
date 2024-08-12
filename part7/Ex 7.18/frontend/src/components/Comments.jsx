const Comments = ({ blog }) => {
  return (
    <div>
      <h2>Comments</h2>
      <>
        {blog.comments.map((comment) => (
          <p key={comment.id}>{comment}</p>
        ))}
      </>
    </div>
  )
}

export default Comments
