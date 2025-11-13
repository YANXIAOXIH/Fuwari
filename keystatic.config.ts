import { config, fields, collection } from '@keystatic/core';

export default config({
  // 1. 在本地开发时，内容会直接写入本地文件系统。
  storage: {
    kind: 'local',
    //kind: 'github',
    //repo: '你的GitHub用户名/你的fuwari仓库名',
  },

  // 我们现在定义两个集合，来匹配你的 src/content/ 目录结构
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      // ⭐ 最终修正的路径: 匹配 posts 目录下及其所有子目录下的任何 .md 或 .mdx 文件
      path: 'src/content/posts/**/*.{md,mdx}',
      format: 'frontmatter',
      schema: {
        // 这个 schema 已经是正确的，保持不变
        title: fields.slug({ name: { label: '文章标题' } }),
        published: fields.date({ label: '发布日期' }),
        description: fields.text({ label: '文章描述', multiline: true }),
        image: fields.image({
          label: '封面图 (可选)',
          directory: 'src/assets/images/blog',
          publicPath: '@assets/images/blog/'
        }),
        tags: fields.array(
          fields.text({ label: '标签' }), {
            label: '标签',
            itemLabel: props => props.value
          }
        ),
        category: fields.text({ label: '分类' }),
        draft: fields.checkbox({
            label: '草稿',
            description: '勾选此项后，文章将不会被发布。'
        }),
        content: fields.document({
          label: '正文内容',
          formatting: true,
          links: true,
          images: {
            directory: 'src/assets/images/blog',
            publicPath: '@assets/images/blog/'
          },
        }),
      },
    }),
    
    spec: collection({
        label: '特殊页面',
        slugField: 'title',
        path: 'src/content/spec/*', 
        format: 'frontmatter',
        schema: {
            title: fields.slug({ name: { label: '页面标题' } }),
            content: fields.document({
              label: '页面内容',
              formatting: true,
              dividers: true,
              links: true,
            }),
        }
    })
  },
});