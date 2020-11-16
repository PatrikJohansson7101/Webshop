import React from "react";

export default function Categories(props: any) {
  const categoryData = props.categoryData;

  function filterCategoryArray(categoryId) {
    props.filterCategoryArray(categoryId);
  }

  function getAllMovies() {
    props.getAllMovies();
  }

  return (
    <div>
      <div>
        <button className="oneCat" onClick={() => getAllMovies()}>
          All movies
        </button>
      </div>
      {categoryData.length ? (
        categoryData.map((item: any) => (
          <div key={item.id}>
            <button
              onClick={() => filterCategoryArray(item.id)}
              className="oneCat"
            >
              {item.name}
            </button>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
