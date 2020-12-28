import React, {Component} from 'react';
import '../css/profile.item.component.css';

export default class ProfileItem extends Component {
    render() {
        const {contentColor, fontWeight} = this.props;
        return (
            <div className='ProfileItem'>
                <p className='ItemTitle'>
                    {this.props.title}
                </p>
                <p className='ItemContent' style={{
                    color: contentColor,
                    fontWeight: fontWeight}}>
                    {this.props.content}
                </p>
            </div>
        )
    }
}