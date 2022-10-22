import * as React from 'react';
import { createRef } from 'react'

import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";


import { IQuestion, ICategory, ICategoryState } from '../Categories/types'
import './AutoSuggest.css'


// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expression
// s#Using_Special_Characters
function escapeRegexCharacters(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


let inputAutosuggest = createRef<HTMLInputElement>();

const QuestionAutosuggestMulti = Autosuggest as { new(): Autosuggest<IQuestion, ICategory> };

export class AutoSuggest extends React.Component<{ 
	categories: ICategory[], 
	categoryQuestions: Map<number, ICategoryState>,
	tekst: string|undefined, 
	onSelectQuestion: (categoryId: number, questionId: number) => void }, any> {
	// region Fields

	state: any;
	//inputAutosuggest: React.RefObject<HTMLInputElement>;
	// endregion region Constructor
	constructor(props: any) {
		super(props);
		this.state = {
			value: props.tekst || '',
			suggestions: this.getSuggestions(''),
			highlighted: ''
		};
		//this.inputAutosuggest = createRef<HTMLInputElement>();
	}

	componentDidMount() {
		setTimeout(() => {
			//inputAutosuggest!.current!.focus();
			setTimeout(() => {
				window.focus()
				inputAutosuggest!.current!.focus();
			}, 500)

		}, 100)

		// console.log('componentDidMount', document)
		// console.log(document?.getElementById('inputAutoSuggest'))
		//document?.getElementById('inputAutoSuggest')?.focus(); 
	}

	// endregion region Rendering methods
	render(): JSX.Element {
		const { value, suggestions } = this.state;

		return <QuestionAutosuggestMulti
			onSuggestionsClearRequested={this.onSuggestionsClearRequested}  // (sl) added
			multiSection={true}
			suggestions={suggestions}
			onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
			onSuggestionSelected={this.onSuggestionSelected.bind(this)}
			getSuggestionValue={this.getSuggestionValue}
			renderSuggestion={this.renderSuggestion}
			renderSectionTitle={this.renderSectionTitle}
			getSectionSuggestions={this.getSectionSuggestions}
			// onSuggestionHighlighted={this.onSuggestionHighlighted} (sl)
			onSuggestionHighlighted={this.onSuggestionHighlighted.bind(this)}
			highlightFirstSuggestion={true}
			renderInputComponent={this.renderInputComponent}
			renderSuggestionsContainer={this.renderSuggestionsContainer}
			inputProps={{
				placeholder: `Type 'promocode'`,
				value,
				onChange: (e, changeEvent) => this.onChange(e, changeEvent),
			}}

		/>;
	}

	protected onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};



	protected onSuggestionSelected(event: React.FormEvent<any>, data: Autosuggest.SuggestionSelectedEventData<IQuestion>): void {
		const question: IQuestion = data.suggestion;
		// alert(`Selected question is ${question.questionId} (${question.text}).`);
		this.props.onSelectQuestion(question.categoryId, question.questionId);
	}

	/*
	protected renderSuggestion(suggestion: Question, params: Autosuggest.RenderSuggestionParams): JSX.Element {
		 const className = params.isHighlighted ? "highlighted" : undefined;
		 return <span className={className}>{suggestion.name}</span>;
	}
	*/

	protected renderSuggestion(suggestion: IQuestion, params: Autosuggest.RenderSuggestionParams): JSX.Element {
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

	protected renderSectionTitle(section: ICategory): JSX.Element {
		return <strong>{section.title}</strong>;
	}

	// protected renderInputComponent(inputProps: Autosuggest.InputProps<IQuestion>): JSX.Element {
	// 	 const { onChange, onBlur, ...restInputProps } = inputProps;
	// 	 return (
	// 		  <div>
	// 				<input {...restInputProps} />
	// 		  </div>
	// 	 );
	// }

	protected renderInputComponent(inputProps: Autosuggest.RenderInputComponentProps): JSX.Element {
		const { ref, ...restInputProps } = inputProps;
		// if (ref !== undefined)
		// 	this.inputAutosuggest = ref as React.RefObject<HTMLInputElement>;
		return (
			<div>
				<input {...restInputProps} ref={inputAutosuggest} />
			</div>
		);
	}

	protected renderSuggestionsContainer({ containerProps, children, query }: Autosuggest.RenderSuggestionsContainerParams): JSX.Element {
		return (
			<div {...containerProps}>
				<span>{children}</span>
			</div>
		);
	}
	// endregion region Event handlers

	protected onChange(event: /*React.ChangeEvent<HTMLInputElement>*/ React.FormEvent<any>, { newValue, method }: Autosuggest.ChangeEvent): void {
		this.setState({ value: newValue });
	}

	protected onSuggestionsFetchRequested({ value }: any): void {
		this.setState({
			suggestions: this.getSuggestions(value)
		});
	}

	private anyWord = (valueWordRegex: RegExp[], questionWords: string[]): boolean => {
		for (let valWordRegex of valueWordRegex)
			for (let questionWord of questionWords)
				if (valWordRegex.test(questionWord))
					return true;
		return false;
	}
	// endregion region Helper methods
	protected getSuggestions(value: string): ICategory[] {
		const escapedValue = escapeRegexCharacters(value.trim());

		if (escapedValue === '') {
			return [];
		}

		const valueWords = escapedValue.split(' ');
		const valueWordRegex = valueWords.map(word => new RegExp(word, 'i'))
		// const regex = new RegExp('^' + escapedValue, 'i');
		// const regex = new RegExp(escapedValue, 'i');

		// return AutoSuggest.questions	 
		//  return this.props.categories
		// 		.map(section => {
		// 			return {
		// 					title: section.title,
		// 					questions: section
		// 						.questions
		// 						.filter(question => regex.test(question.text))
		// 			};
		// 		})
		// 		.filter(section => section.questions.length > 0);
        const {categories, categoryQuestions} = this.props;
		return categories
			.map(group => {
				console.log('categoryId:', group.categoryId, categoryQuestions.get(group.categoryId)!.questions)
				return {
					...group,
					questions: //.group.questions
						categoryQuestions.get(group.categoryId)!.questions
							.filter(question => this.anyWord(valueWordRegex, question.words!))
				};
			})
			.filter(section => section.questions.length > 0);
	}

	protected getSuggestionValue(suggestion: IQuestion) {
		return suggestion.text;
	}

	protected getSectionSuggestions(section: ICategory) {
		return section.questions;
	}

	protected onSuggestionHighlighted(params: Autosuggest.SuggestionHighlightedParams): void {
		this.setState({
			highlighted: params.suggestion
		});
	}
	// endregion
}

