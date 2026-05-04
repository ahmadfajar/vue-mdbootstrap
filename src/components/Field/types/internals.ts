import type { MaybeNumber, MaybeNumberish, MaybeString } from '@/types';
import type { UpdateModelValueEventProps, UpdateModelValueEventPublic } from '@/types/internals.ts';
import type { VNode } from 'vue';

export declare type FieldEventProps<T> = UpdateModelValueEventProps<T> & {
  /**
   * Fired when this Field's value is being cleared.
   */
  clear?: VoidFunction;

  /**
   * Fired when this Field lost focus.
   */
  blur?: EventListener;

  /**
   * Fired when this Field got focused.
   */
  focus?: EventListener;
};

export declare interface FieldEventPublic<T> extends UpdateModelValueEventPublic<T> {
  /**
   * Fired when this Field's value is being cleared.
   */
  onClear?: VoidFunction;

  /**
   * Fired when this Field lost focus.
   */
  onBlur?: EventListener;

  /**
   * Fired when this Field got focused.
   */
  onFocus?: EventListener;

  /**
   * Fired when this Field's value is being cleared.
   */
  '@clear'?: VoidFunction;

  /**
   * Fired when this Field lost focus.
   */
  '@blur'?: EventListener;

  /**
   * Fired when this Field got focused.
   */
  '@focus'?: EventListener;
}

export declare interface FieldSlots {
  /**
   * The default slot used to place the Field's label.
   */
  default?: (arg: { id: string }) => VNode[] | VNode;

  /**
   * Additional slot used to place custom icon or component at the inner right side.
   */
  'append-inner'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom icon or component at the outer right side.
   */
  'append-outer'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom icon or component at the inner left side.
   */
  'prepend-inner'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom icon or component at the outer left side.
   */
  'prepend-outer'?: () => VNode[] | VNode;

  /**
   * Additional slot used to place custom help text.
   */
  'help-text'?: () => VNode[] | VNode;
}

export declare type ChipFieldEventProps = FieldEventProps<string | string[]> & {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;

  /**
   * Fired when an item is deleted from the collection.
   */
  'delete-item'?: (deletedItem: string) => void;
};

export declare interface ChipFieldEventPublic extends FieldEventPublic<string | string[]> {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;

  /**
   * Fired when an item is deleted from the collection.
   */
  'delete-item'?: (deletedItem: string) => void;
}

export declare type NumericFieldEventProps = FieldEventProps<MaybeNumber> & {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;
};

export declare interface NumericFieldEventPublic extends FieldEventPublic<MaybeNumber> {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;
}

export declare type SearchFieldEventProps = FieldEventProps<MaybeString> & {
  /**
   * Fired when the Popover is hiding.
   */
  close?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  open?: VoidFunction;

  /**
   * Asks handler to start searching for the given keyword.
   */
  search?: (value: string) => void;
};

export declare interface SearchFieldEventPublic extends FieldEventPublic<MaybeString> {
  /**
   * Fired when the Popover is hiding.
   */
  onClose?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  onOpen?: VoidFunction;

  /**
   * Asks handler to start searching for the given keyword.
   */
  onSearch?: (value: string) => void;

  /**
   * Fired when the Popover is hiding.
   */
  '@close'?: VoidFunction;

  /**
   * Fired when the Popover is show.
   */
  '@open'?: VoidFunction;

  /**
   * Asks handler to start searching for the given keyword.
   */
  '@search'?: (value: string) => void;
}

export declare type TextAreaEventProps = FieldEventProps<MaybeString> & {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<textarea>` element.
   */
  keydown?: EventListener;
};

export declare interface TextAreaEventPublic extends FieldEventPublic<MaybeString> {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<textarea>` element.
   */
  keydown?: EventListener;
}

export declare type TextFieldEventProps = FieldEventProps<MaybeNumberish> & {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;
};

export declare interface TextFieldEventPublic extends FieldEventPublic<MaybeNumberish> {
  /**
   * Fired when `KeyboardEvent` is triggered by the `<input>` element.
   */
  keydown?: EventListener;
}
