import { View, Image } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { Card } from '../../components';
import Instant from '../../utils/instant';
import './Book.scss';

export default class extends Component {
  static defaultProps = {
    data: {
      title: [null, null],
      desc: '',
      num: '',
    },
  };

  handleImgPreview(url) {
    const { data } = this.props;
    Taro.previewImage({
      current: url,
      urls: [Instant.cover(data.num)].concat(Instant.pages(data.num)),
    });
  }

  render() {
    const { data } = this.props;
    return (
      <View className="book">
        <View className="header">
          <View className="title">{data.title[0]}</View>
          <View className="tag">{data.title[1].toUpperCase()}</View>
          <Image
            lazyLoad
            className="cover"
            src={Instant.cover(data.num)}
            mode="widthFix"
            onClick={this.handleImgPreview.bind(this, Instant.cover(data.num))}
          />
        </View>
        <Card padding>
          <View className="content">
            {data.desc.split(/\|/g).map((item, i) => (
              <View key={i}>{item}</View>
            ))}
          </View>
          {Instant.pages(data.num).map((item, i) => (
            <Image
              lazyLoad
              className="page"
              key={i}
              src={item}
              mode="widthFix"
              onClick={this.handleImgPreview.bind(this, item)}
            />
          ))}
          <View className="date">24 pages / 200 x 270 mm</View>
        </Card>
      </View>
    );
  }
}
