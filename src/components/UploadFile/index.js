import React from 'react';
import { Form, Upload, Icon, Button, message } from 'antd';

// @Form.create()

class UploadFile extends React.Component {

  state = {
    defaultFileList: this.props.defaultFileList || [], // 默认数据
  };


  onChange = async (info) => {

    const { addSuccess } = this.props;

    const { file, fileList } = info;
    if (file.status === 'done') {
      let isUpdate = true;
      for (let item of fileList) {
        const { status } = item;
        if (status === 'uploading') {
          isUpdate = false;
        }
        if (status === 'done') { // 上传完成
          const { response = {} } = item;
          // 上传失败
          if (response.code == -1) {
            isUpdate = false;
            message.error(`${info.file.name + response.info}`);
          }
        }
      }

      if (isUpdate && addSuccess) { // 文件上传成功
        addSuccess();
      }
    }
    this.setState({ defaultFileList: fileList });
  };


  render() {

    const { disabled } = this.props;
    const { defaultFileList } = this.state;

    const props = {
      action: 'admin/bannedword/importExcel',
      ...this.props,
      name: 'file',
      headers: {
        authorization: 'authorization-text',
      },

    };

    const { title = '导入文件' } = this.props;

    return (
      <Upload
        {...props}

        fileList={defaultFileList}
        onChange={this.onChange}
      >
        <Button
          disabled={disabled}>{title}</Button>
      </Upload>
    );
  }
}

export default UploadFile;
