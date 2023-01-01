import React from 'react';
import { Link } from 'react-router-dom';
//import { articles } from '../pages/article.content';

export const ArticlesList = ({ articles }: any) => {
	return (
		<>
			{articles.map((article: any) => (
				<Link
					key={article.title}
					className="article-list-item"
					to={`/articles/${article.name}`}
				>
					<h3>{article.title}</h3>
					<p>{article.content.substring(0, 150)}...</p>
				</Link>
			))}
		</>
	);
};
