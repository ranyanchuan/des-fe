/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Upload, Icon } from 'antd';
import { api } from 'utils/config';

@Form.create()

class ConUploadOne extends React.Component {

  state = {
    imageUrl: '',
  };

  componentDidMount() {
    const { imageUrl } = this.props;
    this.setState({ imageUrl });
  }

  componentWillReceiveProps(nextProps, nextState) {
    // 将picture url 放到 state 中
    const { imageUrl } = nextProps;
    this.setState({ imageUrl });
  }


  // 文件上传请处理
  beforeUpload = () => {

  };


  // 文件上传成处理
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const { response } = info.fileList[0];
      const { url } = response;
      // 服务器端 头像地址
      if (url) {
        this.props.updatePicture(url[0]);
        this.setState({ imageUrl: url[0] });
      }

    }
  };

  render() {

    const { disabled = false, title,formItemLayout,label="头像" } = this.props;
    const { imageUrl } = this.state;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'}/>
        <div className="ant-upload-text">{title ? title : '上传头像'}</div>
      </div>
    );

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={api.addFile}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            disabled={disabled}
            style={{ width: '100%' }}
          >
            {imageUrl ? <img src={imageUrl} alt={title} style={{ height: 90 }}/> : uploadButton}
          </Upload>
        </Form.Item>
      </div>
    );
  }
}

export default ConUploadOne;
