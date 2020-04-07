import React from 'react';
import { Form, Upload, Icon, Button, message, Modal } from 'antd';

const { Dragger } = Upload;


@Form.create()

class ConUploadFileModal extends React.Component {

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {

    const props = {
      name: 'file',
      multiple: true,
      action: '/admin/file/upload',
      data:{
        pid:'xxxx',
      },

      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} 文件上传失成功`);
        } else if (status === 'error') {
          message.error(`${info.file.name} 文件上传失败`);
        }
      },
    };


    const { title = '上传' } = this.props;

    return (
      <span>
        <Button onClick={this.showModal}>{title}</Button>
        <Modal
          title="文件上传"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
          wrapClassName="conUploadFileModal"
        >
         <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox"/>
            </p>
            <p className="ant-upload-text">单击或拖动文件到此区域以上载</p>
            <p className="ant-upload-hint">点击选择上传文件</p>
         </Dragger>
        </Modal>
      </span>
    );
  }
}

export default ConUploadFileModal;
