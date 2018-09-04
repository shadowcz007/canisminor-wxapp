import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { WhiteSpace, Loading, Card } from '../../components';
import './experience.scss';
import { connect } from '@tarojs/redux';
import action from '../../utils/action';

@connect(({resume, loading}) => ({
	experience: resume.experience,
	loading   : loading.effects['resume/get']
}))
export default class extends Component {

	static defaultProps = {
		experience: {
			marin: [],
			extra: []
		},
		loading   : true
	};

	config = {
		navigationBarTitleText: 'Experience'
	};

	componentDidMount = () => {
		this.props.dispatch(action('resume/get'));
	};

	render() {
		const {loading, experience} = this.props;
		return (
			<View className='view'>
				<Card padding>
					<View className="main-list">
					{loading ? <Loading/> : experience.main.map((item, i) => {
						const content = item.desc.replace(/\|/g, '')
						return (
							<View className="main-exp" key={i}>
								<Image src={`https://canisminor.cc${item.img}`}
								       style={item.color === "#999999" ? {border: "1px solid #eee"}:null}
								       mode="widthFix"
								       lazyLoad
								/>
								<View className="content">
									<View className="title">{item.title}</View>
									<View className="time">{item.time[0]}{item.time[1]}</View>
									<View className="desc">{content}</View>
								</View>
							</View>
						)
					})}
					</View>
				</Card>
				<WhiteSpace/>
				<Card title="Extra Identities">
					<View className="extra-list">
						{loading ? <Loading/> : experience.extra.map((item, i) => {
							return (
								<View className="extra-exp" key={i}>
									<Image src={`https://canisminor.cc${item.img}`}
									       mode="widthFix"
									       lazyLoad
									/>
									<View className="content">
										<View className="title">{item.title}</View>
										<View className="desc">{item.desc}</View>
									</View>
								</View>
							)
						})}
					</View>
				</Card>
				<WhiteSpace/>
			</View>
		);
	}
}
