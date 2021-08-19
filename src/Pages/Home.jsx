import React from 'react';
import { FilterForm } from '../Components/FilterForm';

import { Table } from '../Components/Table';

const sortFields = ['name', 'count', 'dist'];
const sortBy = ['equals', 'contain', 'more', 'less'];

export const Home = () => {
  const [data, setData] = React.useState([]);
  const [sortData, setSortData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [fetching, setFetching] = React.useState(true);
  const [totalCount, setTotalCount] = React.useState(0);
  const [filterForm, setFilterForm] = React.useState({ field: null, sortBy: null, value: '' });

  //Function for get data from server
  const getData = React.useCallback(async () => {
    if (fetching) {
      try {
        const res = await fetch(`http://localhost:8000/?page=${currentPage}`, {
          method: 'GET',
        });

        const newData = await res.json();

        //set the count of data that came from the server
        const headers = res.headers;
        setTotalCount(headers.get('x-total-count'));

        //increase page for next fetch
        setCurrentPage((prev) => prev + 1);

        //add new data to old
        setData((prev) => [...prev, ...newData]);

        setFetching(false);
      } catch (e) {
        setFetching(false);
      }
    }
  }, [fetching]);

  // If currentPage was change fetch new data
  React.useEffect(() => {
    if (fetching) getData();
  }, [getData, fetching]);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        200 &&
      totalCount > data.length
    ) {
      setFetching(true);
    }
  };

  //An event listener to be called when the user scrolls down the page
  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilterForm((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };

  //if filter form was changed
  //filtering data
  React.useEffect(() => {
    if (filterForm.field && filterForm.sortBy && filterForm.value) {
      let value = filterForm.value;
      if (filterForm.field === 'count' || filterForm.field === 'dist') {
        value = Number(value);
      }
      switch (filterForm.sortBy) {
        case 'equals':
          setSortData(data.filter((item) => item[filterForm.field] === value));
          break;
        case 'contain':
          setSortData(
            data.filter((item) => String(item[filterForm.field]).includes(String(value))),
          );
          break;
        case 'less':
          setSortData(data.filter((item) => item[filterForm.field] < value));
          break;
        case 'more':
          setSortData(data.filter((item) => item[filterForm.field] > value));
          break;
        default:
          setSortData(data);
      }
    } else {
      setSortData(data);
    }
  }, [filterForm, data]);

  return (
    <>
      <FilterForm
        sortFields={sortFields}
        sortBy={sortBy}
        value={filterForm.value}
        onChange={changeHandler}
      />
      <Table data={sortData} />
    </>
  );
};
