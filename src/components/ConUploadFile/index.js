import React from 'react';
import { Form, Upload, Icon, Button, message } from 'antd';

@Form.create()

class ConUploadFile extends React.Component {

  render() {

    const {onChange}=this.props;



    const props = {
      action: '/api/file/upload',
      name: 'fileName',
      ...this.props,

      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          const { response } = info.file;
          const { link } = response || {};
          if (link) {
            if(onChange){
              onChange(link, info.file);
            }
            message.success(`${info.file.name} 文件上传成功`);
          }else{
            message.error(`${info.file.name} 文件上传失败`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };

    const {
      title = '导入文件',
      disabled = false,
      formItemLayout = {
        labelCol: { sm: { span: 3 } },
        wrapperCol: { sm: { span: 21 } },
      },
      label = '头像',
      accept,
    } = this.props;

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          // style={{ marginBottom: 0, paddingBottom: 0 }}
        >
          <Upload {...props}
                  disabled={disabled}
                  style={{ width: '100%' }}
                  accept={accept}
          >
            <Button>{title}</Button>
          </Upload>
        </Form.Item>
      </div>
    );
  }
}

export default ConUploadFile;
