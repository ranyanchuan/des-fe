/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Upload, Icon, Modal } from 'antd';
import { api } from 'utils/config';

@Form.create()

class ConUploadMore extends React.Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.fileList,
  };

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    // 将picture url 放到 state 中
    const { fileList = [] } = nextProps;
    if (fileList !== this.props.fileList) {
      this.setState({ fileList: fileList });
    }
  }


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };


  getFileList = () => {
    const { fileList } = this.state;
    const result = [];
    for (const [index, file] of fileList.entries()) {
      if (file.status === 'done') {
        const { url, response } = file;
        if (url) {
          result.push(url);
          continue;
        }
        if (response) {
          const { url } = response;
          if (url && Array.isArray(url)) {
            result.push(url[0]);
          }
        }
      }
    }
    return result;
  };
  handleChange = ({ fileList }) => this.setState({ fileList });



  render() {

    const { disabled = false, title, formItemLayout, label = '图片' } = this.props;
    const { fileList = [], previewVisible, previewImage } = this.state;

    console.log('fileList', fileList);

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">{title ? title : '上传图片'}</div>
      </div>
    );

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          <div className="clearfix">
            <Upload
              disabled={disabled}
              action={api.addFile}
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              onRemove={this.handleRemove}
            >
              {fileList.length >= 3 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage}/>
            </Modal>
          </div>
        </Form.Item>
      </div>
    );
  }
}

export default ConUploadMore;
