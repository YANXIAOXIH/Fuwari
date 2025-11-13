import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
    //kind: 'github',
    //repo: '你的GitHub用户名/你的fuwari仓库名',
  },

  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});