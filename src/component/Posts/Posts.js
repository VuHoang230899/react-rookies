import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSortByTitle, setIsSortByTitle] = useState('Title--Sort (NONE)');

  useEffect(() => {
    let didCancel = false;
    setIsLoading(true);
    axios
    .get(`http://localhost:8080/api/v1/posts`)
    .then(response => {
      if(!didCancel) {
        setPosts(response.data);
        setIsLoading(false);
      }
    })
    .catch(error => {
      console.log(error);
    })
    return () => {
      didCancel = true;
    }
  }, []);

  const postsTitle = () => {
    if( isSortByTitle === 'Title--Sort (NONE)' ) {
      return setIsSortByTitle( isSortByTitle => 'Title--Sort (ASC)' );
    }
    else if( isSortByTitle === 'Title--Sort (ASC)' ) {
      return setIsSortByTitle( isSortByTitle => 'Title--Sort (DESC)' );
    }
    else if( isSortByTitle === 'Title--Sort (DESC)' ) {
      return setIsSortByTitle( isSortByTitle => 'Title--Sort (NONE)' );
    }
  }

  const postsFiltered = posts.filter(post => post.title.toLowerCase().includes(searchText.toLowerCase()));

  const postsSorted = () => {
    if( isSortByTitle === 'Title--Sort (NONE)' ) {
      return postsFiltered;
    }
    return postsFiltered.sort((post_1, post_2) => {
      if (isSortByTitle === 'Title--Sort (ASC)') {
        return post_1.title.localeCompare(post_2.title);
      }
      else return post_2.title.localeCompare(post_1.title);
    })
  }

  const postsSortedByTitle = postsSorted();

  if(isLoading) {
    return ( <div>Loading ...</div> )
  }
  else {
    return (
      <div>
        <input className="search-by-title"
              type="text"
              placeholder="Search by title"
              value={ searchText }
              onChange= { evt => setSearchText(evt.target.value) }
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th onClick= { postsTitle }>{ isSortByTitle }</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{ postsSortedByTitle.map(post => 
            <tr key={ post.id }>
              <td>{ post.id }</td>
              <td>{ post.title }</td>
              <td>
                <Link to= { `/postdetail/${post.id}`}>View Detail</Link>
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Posts;