import { useState, useEffect } from 'react';
import { articles } from './Article-content';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import axios from 'axios';
import { CommentsList } from '../components/CommentsList';
import { AddCommentForm } from '../components/AddCommentForm';
import { useUser } from '../hooks/useUser';
export const ArticlePage = () => {
	const { articleId } = useParams();
	const [articleInfo, setarticleInfo] = useState({
		title: '',
		name: '',
		content: '',
		upvotes: '',
		canUpvot: false,
		comments: [{ postedBy: '', text: '', createdAt: '' }],
	});
	const { canUpvote } = articleInfo;
	const { user, isLoading } = useUser();
	useEffect(() => {
		const loadArticle = async () => {
			const token = user && (await user.getIdToken());
			const headers = token ? { authtoken: token } : {};
			const response = await axios.get(
				`http://localhost:8000/api/read-post/${articleId}`,
				{
					headers,
				}
			);
			const newarticleInfo = response;
			// console.log('here', newarticleInfo.data.data);
			setarticleInfo(newarticleInfo.data.data);
		};
		loadArticle();
	}, []);

	// const article = articles.find((article) => article.name === articleId);
	// console.log(articleInfo);
	const addUpvote = async () => {
		//
		const token = user && (await user?.getIdToken());
		const headers = token ? { authtoken: token } : {};
		//

		const data = await axios.patch(
			`http://localhost:8000/api/update-votes/${articleId}`,
			null,
			{ headers }
		);
		console.log(data);
		setarticleInfo(data.data.data);
	};
	if (!articleInfo) return <NotFoundPage />;
	return (
		<>
			<h1>{articleInfo?.title}</h1>
			<div className="upvotes-section">
				{user ? (
					<button onClick={addUpvote}>{canUpvote ?  </button>
				) : (
					<button>Login to upvote</button>
				)}
				<p>This Article has {articleInfo.upvotes} upvotes</p>
			</div>
			<article>{articleInfo?.content}</article>
			{user ? (
				<AddCommentForm
					articleName={articleId}
					onArticleUpdated={(updatedArticle: any) =>
						setarticleInfo(updatedArticle)
					}
				/>
			) : (
				<button>Log In to Comment</button>
			)}
			<CommentsList comments={articleInfo.comments} />
		</>
	);
};
