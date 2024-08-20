'use client';
import React, { useCallback, useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

const InfiniteScroll = ({ data, render }: { data: any[]; render: any }) => {
  const [itemsToShow, setItemsToShow] = useState<any[]>([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(
    throttle(
      () => {
        setLoading(true);
        const newIndex = lastIndex + 4;
        const newContent = data.slice(lastIndex, newIndex);
        setLastIndex(newIndex);
        setItemsToShow((prevItems) => [...prevItems, ...newContent]);
        setLoading(false);
      },
      2000,
      { trailing: false }
    ),
    [lastIndex, data]
  );

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return (
    <div>
      {render(itemsToShow)} {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScroll;
