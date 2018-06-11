/* @flow */

import React from 'react';
import { Flex, Input, Button, Small } from 'rebass';
import logger from 'minimal-logger';

const ENTER_KEY_CODE = 13;

type Props = {
  className?: string,
  commitOnBlur?: boolean,
  initialValue?: string,
  placeholder?: string,
  onSave?: string => Promise<any>,
};

type State = {
  text: string,
  error: string,
};

class URLInput extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
    commitOnBlur: false,
    initialValue: '',
    placeholder: '',
    onSave: () => {},
  };
  state: State = {
    text: this.props.initialValue || '',
    error: '',
  };
  props: Props;

  commitChanges = async () => {
    const newText = this.state.text.trim();
    if (newText !== '' && this.props.onSave) {
      try {
        await this.props.onSave(newText);
        this.setState({ text: '' });
      } catch (err) {
        logger.error(err);
        this.setState({ error: err.message });
      }
    }
  };
  handleBlur = () => {
    if (this.props.commitOnBlur) {
      this.commitChanges();
    }
  };
  handleChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value, error: '' });
  };
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      this.commitChanges();
    }
  };
  render() {
    const buttonEnabled = this.state.text.trim().length > 0;
    return (
      <React.Fragment>
        <Flex>
          <Input
            px={16}
            className={this.props.className}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder={this.props.placeholder}
            value={this.state.text}
          />
          <Button
            ml={16}
            disabled={!buttonEnabled}
            onClick={this.commitChanges}
          >
            Add
          </Button>
        </Flex>
        <Small color="red">{this.state.error}</Small>
      </React.Fragment>
    );
  }
}

export default URLInput;
