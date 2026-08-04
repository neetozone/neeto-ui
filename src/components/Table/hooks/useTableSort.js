import { useEffect, useRef, useState } from "react";

import { isPresent } from "neetocist";
import { isNil, mergeLeft } from "ramda";
import { useHistory } from "react-router-dom";

import { useQueryParams } from "hooks";
import { buildUrl, setToLocalStorage } from "utils";

import { URL_SORT_ORDERS } from "../constants";
import {
  getSortInfoFromQueryParams,
  getSortField,
  getPersistedTableSort,
  getSortPreferenceLocalStorageKey,
} from "../utils";

const useTableSort = ({
  shouldPersistSort = false,
  localStorageKeyPrefix,
} = {}) => {
  const queryParams = useQueryParams();
  const [sortedInfo, setSortedInfo] = useState(() =>
    getSortInfoFromQueryParams(queryParams)
  );
  const hasRestoredPersistedSort = useRef(false);

  useEffect(() => {
    setSortedInfo(getSortInfoFromQueryParams(queryParams));
  }, [queryParams?.sort_by, queryParams?.order_by]);

  const history = useHistory();

  const persistSortPreference = params => {
    if (!shouldPersistSort) return;

    setToLocalStorage(getSortPreferenceLocalStorageKey(localStorageKeyPrefix), {
      sort_by: params.sort_by ?? null,
      order_by: params.order_by ?? null,
    });
  };

  useEffect(() => {
    if (hasRestoredPersistedSort.current) return;
    hasRestoredPersistedSort.current = true;

    if (!shouldPersistSort || isPresent(queryParams.sort_by)) return;

    const persistedSort = getPersistedTableSort(localStorageKeyPrefix);
    if (isNil(persistedSort?.sort_by) || isNil(persistedSort?.order_by)) return;

    // Restore the persisted sort into the URL on mount; the URL remains the
    // single source of truth afterwards.
    history.replace(
      buildUrl(
        window.location.pathname,
        mergeLeft(
          { sort_by: persistedSort.sort_by, order_by: persistedSort.order_by },
          queryParams
        )
      )
    );
  }, [shouldPersistSort, localStorageKeyPrefix, queryParams, history]);

  const handleTableChange = (pagination, sorter) => {
    const params = {
      sort_by: sorter.order ? getSortField(sorter.field) : undefined,
      order_by: URL_SORT_ORDERS[sorter.order],
      page: pagination.current,
    };

    persistSortPreference(params);

    const pathname = window.location.pathname;
    history.push(buildUrl(pathname, mergeLeft(params, queryParams)));
  };

  return { handleTableChange, sortedInfo, setSortedInfo };
};

export default useTableSort;
