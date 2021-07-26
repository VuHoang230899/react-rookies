import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table } from "react-bootstrap";

const PostsDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8080/api/v1/posts/${id}`)
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{ posts.id }</th>
          <th>{ posts.title }</th>
          <th>{ posts.description }</th>
          <th>{ posts.content }</th>
        </tr>
      </tbody>
    </Table>
  );
};
export default PostsDetail;
