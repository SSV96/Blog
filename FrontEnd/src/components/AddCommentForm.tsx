import axios from 'axios';
import { useState } from 'react';
import { useUser } from '../hooks/useUser';
export const AddCommentForm = ({ articleName, onArticleUpdated }: any) => {
	const [name, setName] = useState('');
	const [commentText, setCommentText] = useState('');
	const { user } = useUser();
	const addComment = async () => {
		const token = user && (await user?.getIdToken());
		const headers = token ? { authtoken: token } : {};

		const response = await axios.patch(
			`http://localhost:8000/api/update-comment/${articleName}`,
			{ postedBy: name, text: commentText },
			{ headers }
		);
		const updatedArticle = response.data.data;
		console.log(updatedArticle);
		onArticleUpdated(updatedArticle);
		setName('');
		setCommentText('');
	};
	return (
		<div id="add-comment-form">
			<h3>Add a Comment</h3>
			{user && <p> You are posting as {user.gmail}</p>}

			<textarea
				value={commentText}
				onChange={(e) => setCommentText(e.target.value)}
				rows={4}
				cols={50}
			/>

			<button onClick={addComment}>Add Comment</button>
		</div>
	);
};
