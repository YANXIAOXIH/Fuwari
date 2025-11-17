/**
 * Keystatic - 内容管理系统配置文件
 * 官网: https://keystatic.com/
 *
 * 这个文件定义了 Keystatic 管理后台的结构，包括：
 * - storage: 内容存储方式（本地或 GitHub）。
 * - singletons: 全局唯一的配置项，如网站设置。
 * - collections: 重复性的内容集合，如博客文章、页面等。
 */

import { config, fields, collection, singleton } from '@keystatic/core';

// ===============================================
// 存储配置 (Storage Configuration)
// ===============================================
// 推荐在生产环境中使用 GitHub 作为存储后端，便于团队协作和版本控制。
// 将仓库信息配置在环境变量中，以保证安全性。
const storage = {
  //kind: 'local',
  kind: 'github',
  repo: import.meta.env.PUBLIC_KEYSTATIC_GITHUB_REPO as `${string}/${string}`,
} as const;

// ===============================================
// Schema 定义: 单例 (Singleton Schemas)
// ===============================================

/**
 * 网站全局设置的 Schema
 */
const siteSettingsSchema = {
  // --- Profile 卡片 ---
  profile: fields.object({
    avatar: fields.image({
      label: '头像 (Avatar)',
      directory: 'public/images/assets/',
      publicPath: '/images/assets/',
      extension: 'jpeg',
    }),

    name: fields.text({ 
      label: '作者名字 (Profile Name)', 
      defaultValue: 'Lorem Ipsum', 
      validation: { 
        isRequired: true 
      } 
    }),

    bio: fields.text({ 
      label: '个人简介 (Bio)', 
      multiline: true, 
      defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' 
    }),

    links: fields.array(
      fields.object({
        name: fields.text({ label: '社交链接名称' }),
        icon: fields.text({ label: '图标代码', description: "来自 icones.js.org 的代码" }),
        url: fields.url({ label: '链接地址' }),
      }),
      {
        label: '社交链接 (Social Links)',
        itemLabel: props => props.fields.name.value,
      }
    ),
  }, { label: '作者信息 (Profile)' }),

  // --- Site Config 卡片 ---
  site: fields.object({
    title: fields.text({ label: '网站标题 (Site Title)', validation: { isRequired: true } }),
    subtitle: fields.text({ label: '网站副标题 (Site Subtitle)', defaultValue: 'Demo Site' }),
    lang: fields.select({
      label: '网站语言 (Language)',
      description: '选择网站的主要语言',
      options: [
        { label: 'English', value: 'en' },
        { label: '简体中文', value: 'zh_CN' },
        { label: '繁体中文', value: 'zh_TW' },
        { label: '日本語', value: 'ja' },
        { label: '한국어', value: 'ko' },
        { label: 'Español', value: 'es' },
        { label: 'ภาษาไทย', value: 'th' },
        { label: 'Tiếng Việt', value: 'vi' },
        { label: 'Türkçe', value: 'tr' },
        { label: 'Bahasa Indonesia', value: 'id' }
      ],
      defaultValue: 'zh_CN'
    }),

    themeColor: fields.object({
            hue: fields.integer({ label: '主题色调 (Theme Color Hue)', description: "色相值 (0-360)", defaultValue: 250 }),
            fixed: fields.checkbox({ label: '固定主题色', description: "为访客隐藏颜色选择器", defaultValue: false }),
    }, { label: '主题颜色' }),

    banner: fields.object({
      enable: fields.checkbox({ label: '启用 Banner', defaultValue: true }),
      src: fields.image({
        label: 'Banner 图片',
        directory: 'public/images/assets/',
        publicPath: '/images/assets/',
        extension: 'jpeg',
      }),

      position: fields.select({
        label: 'Banner 图片位置',
        options: [{ label: 'Top', value: 'top' }, { label: 'Center', value: 'center' }, { label: 'Bottom', value: 'bottom' }],
        defaultValue: 'center'
      }),

      waves: fields.object({
        enable: fields.checkbox({ label: '开启波浪效果', defaultValue: true })
      }, { label: '波浪效果' }),

      credit: fields.object({
        enable: fields.checkbox({ label: '启用图片来源', defaultValue: false }),
        text: fields.text({ label: '来源文本' }),
        url: fields.url({ label: '来源链接' }),
      }, { label: 'Banner 图片来源' }),
    }, { label: '顶部 Banner' }),

    toc: fields.object({
      enable: fields.checkbox({ label: '启用文章目录', defaultValue: true }),
      depth: fields.integer({ label: '目录深度', defaultValue: 2, validation: { min: 1, max: 3 } }),
    }, { label: '文章目录 (TOC)' }),

    favicon: fields.array(
      fields.object({
        src: fields.text({ label: '路径', description: "相对于 /public 目录的路径" }),
        theme: fields.select({ label: '主题', options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }], defaultValue: 'light', }),
        sizes: fields.text({ label: '尺寸', description: "例如 '32x32'" }),
      }), { label: '网站图标 (Favicon)', itemLabel: props => props.fields.src.value }
    ),
  }, { label: '站点配置 (Site Config)' }),

  // --- Navigation Bar 卡片 ---
  navBar: fields.object({
    links: fields.array(
      fields.object({
        name: fields.text({ label: '链接名称' }),
        url: fields.text({ label: '链接地址' }),
        external: fields.checkbox({ label: '是否为外部链接?' }),
      }),
      {
        label: '导航栏链接',
        itemLabel: props => props.fields.name.value,
      }
    ),
  }, { label: '导航栏 (Navigation Bar)' }),

  // --- License 卡片 ---
  license: fields.object({
    enable: fields.checkbox({ label: '启用许可协议', defaultValue: true }),
    name: fields.text({ label: '协议名称', defaultValue: 'CC BY-NC-SA 4.0' }),
    url: fields.url({ label: '协议链接', defaultValue: 'https://creativecommons.org/licenses/by-nc-sa/4.0/' }),
  }, { label: '许可协议 (License)' }),

  // --- Expressive Code 卡片 ---
  expressiveCode: fields.object({
    theme: fields.select({
      label: '代码块主题',
      options: [
        { label: 'GitHub Dark', value: 'github-dark' },
        { label: 'Night Owl', value: 'night-owl' },
        { label: 'Dracula', value: 'dracula' },
      ],
      defaultValue: 'github-dark'
    })
  }, { label: '代码块样式 (Expressive Code)' })
};


// ===============================================
// Schema 定义: 集合 (Collection Schemas)
// ===============================================

/**
 * 博客文章的 Schema
 */
const postsCollectionSchema = {
    title: fields.slug({ name: { label: 'Title' } }),
    published: fields.date({ label: 'Published Date', validation: { isRequired: true } }),
    updated: fields.date({ label: 'Updated Date' }),
    draft: fields.checkbox({ label: 'Draft', defaultValue: true }),
    description: fields.text({ label: 'Description', multiline: true }),
    image: fields.image({
        label: 'Cover Image',
        directory: 'src/content/posts/',
        publicPath: '/src/content/posts/',
        extension: 'jpeg',
    }),

    tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value }),
    category: fields.text({ label: 'Category' }),
    lang: fields.text({ label: 'Language' }),
    resume: fields.file({
        label: 'Resume',
        description: 'Summary of qualifications for this job applicant',
        directory: 'src/content/posts/',
        publicPath: '/src/content/posts/'
    }),

    content: fields.markdoc({
        label: 'Content',
        extension: 'md',
        options: {
            image: {
                directory: 'src/content/posts/',
                publicPath: '/src/content/posts/',
                extension: 'jpeg',
            },
        },
    }),
};

/**
 * 独立页面的 Schema
 */
const pagesCollectionSchema = {
  title: fields.text({ label: 'Title', validation: { isRequired: true } }),
  image: fields.image({
    label: 'Cover Image',
    directory: 'src/content/spec/',
    publicPath: '/src/content/spec/',
    extension: 'jpeg',
  }),
  content: fields.markdoc({
    label: 'Page Content',
    extension: 'md',
    options: {
      image: {
          directory: 'src/content/spec/',
          publicPath: '/src/content/spec/',
          extension: 'jpeg',
      },
    },
  }),
};

// ===============================================
// 主配置导出 (Main Config Export)
// ===============================================
export default config({
    storage,
    singletons: {
      settings: singleton({
          label: 'Site Settings',
          path: 'src/config/settings',
          format: { data: 'json' },
          schema: siteSettingsSchema,
      }),
    },

    collections: {
      posts: collection({
          label: 'Blog Posts',
          slugField: 'title',
          path: 'src/content/posts/**/',
          format: { contentField: 'content' },
          entryLayout: 'content',
          schema: postsCollectionSchema,
      }),
      
      pages: collection({
          label: 'Special Pages',
          slugField: 'title',
          path: 'src/content/spec/**/',
          format: { contentField: 'content' },
          schema: pagesCollectionSchema,
      }),
    },
});
