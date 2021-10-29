import * as React from 'react';

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";

import { IAnswer }  from '../Answers/types'
import './AutoSuggest.css'
import { IQuestion } from '../Categories/types';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expression
// s#Using_Special_Characters
function escapeRegexCharacters(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const QuestionAutosuggestMulti = Autosuggest as { new (): Autosuggest<IAnswer> };

interface IProps {
	answersUnassigned: IAnswer[], 
	question: IQuestion,
	assignQuestionAnswer: (categoryId: number, questionId: number, answerId: number) => void
	setAnswerText?: (val: string) => void
}

export class AutoSuggestAnswer extends React.Component<IProps, any> {

	state: any;

	constructor(props: any) {
		 super(props);

		 this.state = {
			  value: '',
			  suggestions: this.getSuggestions(''),
			  highlighted: ''
		 };
	}
	// endregion region Rendering methods
	render(): JSX.Element {
		 const {value, suggestions} = this.state;

		 return <QuestionAutosuggestMulti
		 	  onSuggestionsClearRequested={this.onSuggestionsClearRequested}  // (sl) added
			  multiSection={false}
			  suggestions={suggestions}
			  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
			  onSuggestionSelected={this.onSuggestionSelected.bind(this)}
			  getSuggestionValue={this.getSuggestionValue}
			  renderSuggestion={this.renderSuggestion}
			  // onSuggestionHighlighted={this.onSuggestionHighlighted} (sl)
			  onSuggestionHighlighted={this.onSuggestionHighlighted.bind(this)}  
			  highlightFirstSuggestion={true}
			  // renderInputComponent={this.renderInputComponent}
			  renderSuggestionsContainer={this.renderSuggestionsContainer}
			  inputProps={{
					placeholder: `Search answers...`,
					value,
					onChange: (e, changeEvent) => this.onChange(e, changeEvent),
			  }}/>;
	}

	protected onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: []
		});
	 };
  
  

	protected onSuggestionSelected(event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<IAnswer>): void {
		 const answer: IAnswer = data.suggestion;
		 // alert(`Selected question is ${question.answerId} (${question.text}).`);
		 this.props.assignQuestionAnswer(
			 this.props.question.categoryId,
			 this.props.question.questionId, 
			 answer.answerId);
		this.setState({
			value: ''
		})
	}

	/*
	protected renderSuggestion(suggestion: Question, params: Autosuggest.RenderSuggestionParams): JSX.Element {
		 const className = params.isHighlighted ? "highlighted" : undefined;
		 return <span className={className}>{suggestion.name}</span>;
	}
	*/

	protected renderSuggestion(suggestion: IAnswer, params: Autosuggest.RenderSuggestionParams): JSX.Element {
		// const className = params.isHighlighted ? "highlighted" : undefined;
		//return <span className={className}>{suggestion.name}</span>;
		const matches = AutosuggestHighlightMatch(suggestion.text, params.query);
		const parts = AutosuggestHighlightParse(suggestion.text, matches);
	 
		return (
		  <span>
			 {parts.map((part, index) => {
				const className = part.highlight ? 'react-autosuggest__suggestion-match' : undefined;
	 
				return (
				  <span className={className} key={index}>
					 {part.text}
				  </span>
				);
			 })}
		  </span>
		);
	}

	// protected renderInputComponent(inputProps: Autosuggest.InputProps<IAnswer>): JSX.Element {
	// 	 const { onChange, onBlur, ...restInputProps } = inputProps;
	// 	 return (
	// 		  <div>
	// 				<input {...restInputProps} />
	// 		  </div>
	// 	 );
	// }

	protected renderSuggestionsContainer({containerProps, children, query}: Autosuggest.RenderSuggestionsContainerParams): JSX.Element {
		 return (
			  <div {...containerProps}>
					<span>{children}</span>
			  </div>
		 );
	}
	// endregion region Event handlers
	protected onChange(event: React.FormEvent<any>, {newValue, method}: Autosuggest.ChangeEvent): void {
		if (this.props.setAnswerText) {
			this.props.setAnswerText(newValue);
		}
		this.setState({value: newValue});
	}

	protected onSuggestionsFetchRequested({value}: any): void {
		 this.setState({
			  suggestions: this.getSuggestions(value)
		 });
	}

	private anyWord = (valueWordRegex: RegExp[], questionWords: string[]) : boolean => {
		for (let valWordRegex of valueWordRegex)
			for (let questionWord of questionWords)
				if (valWordRegex.test(questionWord))
					return true;
		return false;
	} 
	// endregion region Helper methods
	protected getSuggestions(value: string): IAnswer[] {
		const escapedValue = escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const valueWords = escapedValue.split(' ');
		const valueWordRegex = valueWords.map(word => new RegExp(word, 'i') )
		// const regex = new RegExp('^' + escapedValue, 'i');
		// const regex = new RegExp(escapedValue, 'i');

		return this.props.answersUnassigned.filter(answer => this.anyWord(valueWordRegex, answer.words!))
	}

	protected getSuggestionValue(suggestion: IAnswer) {
		 return suggestion.text;
	}


	protected onSuggestionHighlighted(params: Autosuggest.SuggestionHighlightedParams): void {
		 this.setState({
			  highlighted: params.suggestion
		 });
	}
	// endregion
}

