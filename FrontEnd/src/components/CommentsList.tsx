import React from 'react';

export const CommentsList = ({ comments }: any) => (
	<>
		<h3>Comments</h3>

		{comments.map((comment: any) => (
			<div className="comment" key={comment.postedBy + ':' + comment.text}>
				<h4>{comment.postedBy}</h4>
				<p>{comment.text}</p>
				<p>
					Date: {new Date(comment.createdAt).toLocaleTimeString()} Time:
					{new Date(comment.createdAt).toLocaleTimeString()}
				</p>
			</div>
		))}
	</>
);
