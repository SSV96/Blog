import React, { useEffect, useState } from 'react';
// import { articles } from './article.content';
import { Link } from 'react-router-dom';
import { ArticlesList } from '../components/ArticlesList';
import axios from 'axios';
import { articlee } from '../types/article.type';
export const ArticlesListPage = () => {
	const [articles, setArticles] = useState([]);
	useEffect(() => {
		const getAllArticles = async () => {
			const response = await axios.get(
				'http://localhost:8000/api/get-all-posts'
			);

			const art = response.data.data;
			console.log('herer', art);
			setArticles(art);
		};
		getAllArticles();
	}, []);

	return (
		<>
			<h1>Articles</h1>
			<ArticlesList articles={articles} />
		</>
	);
};
