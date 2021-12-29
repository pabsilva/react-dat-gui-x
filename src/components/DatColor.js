import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash.isstring';
import result from 'lodash.result';
import cx from 'classnames';
import ColorPicker from './Picker';

export default class DatColor extends Component {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    data: PropTypes.object.isRequired,
    path: PropTypes.string,
    label: PropTypes.string,
    labelWidth: PropTypes.string.isRequired,
    _onUpdateValue: PropTypes.func.isRequired,
    onChange: PropTypes.func
  };

  static defaultProps = {
    className: null,
    style: null,
    path: null,
    label: null,
    onChange: () => null
  };

  constructor() {
    super();

    this.state = {
      value: null,
      displayColorPicker: false
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextValue = result(nextProps.data, nextProps.path);

    return {
      ...prevState,
      value: nextValue
    };
  }

  handleClickColorPicker = () =>
    this.setState(prevState => ({
      ...prevState,
      displayColorPicker: !prevState.displayColorPicker
    }));

  handleCloseColorPicker = () =>
    this.setState({
      displayColorPicker: false
    });

  handleChangeColor = color => {
    const value = isString(color) ? color : color.hex;
    const { _onUpdateValue, path, onChange } = this.props;

    _onUpdateValue(path, value);
    onChange(path, value);
  };

  renderPicker() {
    const { value, displayColorPicker } = this.state;

    return !displayColorPicker ? null : (
      <div className="popover">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <div
          className="cover"
          onClick={this.handleCloseColorPicker}
          onKeyPress={this.handleCloseColorPicker}
          role="button"
          tabIndex={0}
        />
        <ColorPicker color={value} onChange={this.handleChangeColor} />
      </div>
    );
  }

  render() {
    const { path, label, labelWidth, className, style } = this.props;
    const { value } = this.state;
    const labelText = isString(label) ? label : path;

    return (
      <li
        className={cx('cr', 'color', className)}
        style={{ borderLeftColor: `${value}`, ...style }}
      >
        <label>
          <span className="label-text" style={{ width: labelWidth }}>
            {labelText}
          </span>
          <div
            style={{
              backgroundColor: value,
              width: `calc(100% - ${labelWidth})`
            }}
          >
            <div
              className="swatch"
              onClick={this.handleClickColorPicker}
              onKeyPress={this.handleClickColorPicker}
              role="button"
              tabIndex={0}
            >
              {value}
            </div>
            {this.renderPicker()}
          </div>
        </label>
      </li>
    );
  }
}
