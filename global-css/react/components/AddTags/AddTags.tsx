import React, { useState, useEffect } from 'react';
import { Helmet } from 'vtex.render-runtime';
import { useQuery } from 'react-apollo';

import AppSettings from './addTagsSettings.graphql';

const AddTags = () => {
  const [tags, setTags] = useState<string>('');
  const { data, error } = useQuery(AppSettings, {
    ssr: false,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!data?.publicSettingsForApp?.message) return;

    const settings = JSON.parse(data?.publicSettingsForApp?.message);
    const html = settings?.htmlContent;

    setTags(html);

    if (!html || html.length === 0) {
      console.warn('No tags found');
    }
  }, [data]);

  return (
    !error &&
    tags?.length > 0 && (
      <Helmet>
        <style type="text/css">{tags}</style>
      </Helmet>
    )
  );
};

export default AddTags;
