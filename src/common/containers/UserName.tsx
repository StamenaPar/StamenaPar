import { connect } from 'react-redux';
import { IAppState } from '../../store/Store';
import {OptionName}  from '../components/OptionName'

interface IOwnProps {
	id: number
}

const mapStateToProps = (store: IAppState, ownProps: IOwnProps ) => {
	return {
		options: store.usersState.userOptions,
		id: ownProps.id
	};
};


export default connect(mapStateToProps)(OptionName);
