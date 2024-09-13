import { Icon } from '@/components/utils/icon';
import ReactDOMServer from 'react-dom/server';
import ReactQuill, { Quill } from 'react-quill';
import '@/public/styles/quill.css';
import { useEffect, useState } from 'react';

const qlIcons = Quill.import('ui/icons');
qlIcons['bold'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlBold" width={20} height={20} />,
);
qlIcons['italic'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlItalic" width={20} height={20} />,
);
qlIcons['underline'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlUnderline" width={20} height={20} />,
);
qlIcons['strike'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlStrike" width={20} height={20} />,
);
qlIcons['link'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlLink" width={20} height={20} />,
);
qlIcons['list']['ordered'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlListOrdered" width={20} height={20} />,
);
qlIcons['list']['bullet'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlListBullet" width={20} height={20} />,
);
qlIcons['blockquote'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlBlockquote" width={24} height={24} />,
);
qlIcons['code-block'] = ReactDOMServer.renderToStaticMarkup(
  <Icon iconName="QlCodeBlock" width={24} height={24} />,
);

interface EditorProps {
  field: any;
}
export const Editor = ({ field }: EditorProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', { font: [] }],
      [{ list: 'bullet' }, { list: 'ordered' }],
      ['link', 'code-block', 'blockquote'],
      // [{ font: [] }],
      // [{ header: [1, 2, 3, false] }],
      // [
      //   { align: '' },
      //   { align: 'center' },
      //   { align: 'right' },
      //   { align: 'justify' },
      // ],
      // [{ indent: '-1' }, { indent: '+1' }],
      // ['image'],
      // [{ color: [] }],
      // ['code-block'],
      // ['blockquote'],
      // ['clean'],
    ],
  };

  const quillFormats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'font',
    'header',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {isMounted ? (
        <>
          {/* <Toolbar /> */}
          <ReactQuill
            // modules={{ toolbar: '#toolbar' }}
            modules={quillModules}
            formats={quillFormats}
            className="w-full"
            {...field}
          />
        </>
      ) : (
        <div>Editor loading...</div>
      )}
    </>
  );
};
