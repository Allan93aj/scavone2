declare module 'vtex.styleguide' {
  import type { ComponentType } from 'react'
  import type { HTMLProps, ReactNode, PropsWithChildren } from 'react'

  type Override<T1, T2> = Omit<T1, keyof T2> & T2

  export type Size = 'small' | 'regular' | 'large'
  export type PropsWithSize<P = unknown> = P & { size?: Size }

  export type Variation =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'inverted-tertiary'
    | 'danger'
    | 'danger-tertiary'

  export type PlainVariation = 'danger' | 'inverted' | 'plain'

  export type PropsWithVariation<P = unknown> = P & { variation?: Variation }
  export type PropsWithPlainVariation<P = unknown> = P & {
    variation?: PlainVariation
  }

  type ProgressTypeProps<K = string, P> = P & {
    type: K
  }

  type Label<T = ReactNode> = T & { label?: T }
  type TestId = { testId?: string }

  type ButtonProps = HTMLProps<HTMLButtonElement> &
    Partial<
      Pick<
        HTMLProps<HTMLAnchorElement>,
        'download' | 'href' | 'referrerPolicy' | 'rel' | 'target'
      >
    > &
    PropsWithSize &
    PropsWithVariation & {
      /**
       * Block style
       */
      block?: boolean

      /**
       * Loading state
       */
      isLoading?: boolean

      /**
       * When terciary, the upper case can be prevented
       */
      noUpperCase?: boolean

      /**
       * Disables label wrapping
       */
      noWrap?: boolean

      /**
       * Data attribute
       */
      testId?: string
    }

  interface ButtonWithIconProps {
    icon: React.ReactNode
    iconPosition: 'left' | 'right'
  }

  type CheckboxProps = Pick<
    HTMLProps<HTMLInputElement>,
    'id' | 'name' | 'onChange' | 'checked' | 'disabled' | 'required' | 'value'
  > &
    Label & {
      partial?: boolean
    }

  type InputProps = Omit<HTMLProps<HTMLInputElement>, 'onSubmit' | 'checked'> &
    PropsWithSize &
    Label & {
      /**
       * List of data attributes as a object like
       *
       * ```js
       * { 'locale': 'en-US' }
       * ```
       */
      dataAttributes?: Record<string, string>

      /**
       * Error highlight
       */
      error?: boolean

      /**
       * Error message
       */
      errorMessage?: string | null

      /**
       * Whether the border should join with an element below
       */
      groupBottom?: boolean

      /**
       * Helper text
       */
      helpText?: React.ReactNode

      /**
       * Prefix
       */
      prefix?: React.ReactNode

      /**
       * Suffix attribute
       */
      suffix?: React.ReactNode

      /**
       * If the input is an API Key, App Key or App Token
       */
      token?: boolean
    }

  interface ModalProps extends PropsWithChildren {
    onClose: () => void

    /**
     * Node to be displayed as the bottom bar of the modal.
     */
    bottomBar?: ReactNode

    /**
     * Node to be displayed as the bottom bar of the modal.
     */
    centered?: boolean

    /**
     * Close the modal on ESC key press (default true)
     */
    closeOnEsc?: boolean

    /**
     * Close the modal on overlay click (default true)
     */
    closeOnOverlayClick?: boolean

    /**
     * Container in which the modal is rendered
     */
    container?: unknown

    /**
     * Show or hide the modal
     */
    isOpen?: boolean

    /**
     * Event fired when the closing transition is finished
     */
    onCloseTransitionFinish?: () => void

    /**
     * If true, the modal will expand to fullscreen in small view ports (e.g. mobile)
     */
    responsiveFullScreen?: boolean

    /**
     * Show BottomBar border
     */
    showBottomBarBorder?: boolean

    /**
     * Show the close icon on upper right corner (default true)
     */
    showCloseIcon?: boolean

    /**
     * Show the close icon on upper right corner (default true)
     */
    showTopBar?: boolean

    /**
     * Modal title to be displayed in top of the modal.
     */
    title?: ReactNode
  }
  export const PageHeader
  export const Alert

  /**
   * A modal is an overlay that demands the attention and action from the user, preventing her from interacting with the rest of the page. It might be used from displaying messages to providing a simple form to edit a record.
   */
  export const Modal: ComponentType<ModalProps>

  export const ModalDialog: ComponentType<
    Override<
      ModalProps,
      {
        cancelation: {
          onClick: () => void
        } & Label<string> &
          TestId
        confirmation: {
          onClick: () => void
          isDangerous?: boolean
        } & Label<string> &
          TestId
        loading?: boolean
      }
    >
  >

  export const Box
  export const Card
  export const Table

  export const ActionMenu: ComponentType<
    Pick<
      ButtonProps,
      | 'isGrouped'
      | 'isLastOfGroup'
      | 'isFirstOfGroup'
      | 'isActiveOfGroup'
      | 'onClick'
    > &
      Label & {
        /**
         * Respecting ButtonWithIcon props contract. For more info, see:
         */
        buttonProps?: ButtonProps

        /**
         *Hide the automatic caret icon
         */
        hideCaretIcon?: boolean

        /**
         * Menu width
         */
        menuWith?: string | number

        /**
         * If should close the menu after clicking an option
         */
        shouldCloseOnClick?: boolean

        /**
         * Default z-index to Menu view, default is 999
         */
        zIndex?: string | number

        /**
         * Menu alignment in relation to the button
         */
        align?: 'right' | 'left'

        /**
         * Menu options
         */
        options: Array<
          Label & Pick<ButtonProps, 'onClick' | 'disabled' | 'testId'>
        >
      }
  >

  export const Button: ComponentType<ButtonProps>

  export const ButtonPlain: ComponentType<
    Omit<ButtonProps, 'variation'> & PropsWithPlainVariation
  >

  export const ButtonGroup: ComponentType<{
    buttons: Array<
      ComponentType<
        ButtonProps & {
          isActiveOfGroup?: boolean
          isFirstOfGroup?: boolean
          isGrouped?: boolean
          isLastOfGroup?: boolean
        }
      >
    >
  }>

  export const ButtonWithIcon: ComponentType<ButtonProps & ButtonWithIconProps>

  export const Checkbox: ComponentType<CheckboxProps>

  export const DatePicker: ComponentType<
    Override<
      Omit<HTMLProps<HTMLInputElement>, 'onSubmit' | 'checked'>,
      {
        onChange: (date: Date) => void
        value: Date
        locale: string
        align?: 'left' | 'right'
        direction?: 'down' | 'up'
        excludeDates?: Date[]
        excludeTimes?: Date[]
        maxDate?: Date
        maxTime?: Date
        minDate?: Date
        minDate?: Date
        positionFixed?: boolean
        size?: Size
        timeIntervals?: number
        useTime?: boolean
      }
    > &
      Pick<InputProps, 'error' | 'errorMessage' | 'helpText'> &
      Label
  >

  export const TimePicker: ComponentType<
    Override<
      Omit<HTMLProps<HTMLInputElement>, 'onSubmit' | 'checked'>,
      {
        onChange: (time: Date) => void
        value: Date
        locale: string
        align?: 'left' | 'right'
        direction?: 'down' | 'up'
        excludeTimes?: Date[]
        size?: Size
        interval?: number
        intervals?: number
        useTime?: boolean
      }
    > &
      Pick<InputProps, 'error' | 'errorMessage' | 'helpText'> &
      Label
  >

  export const Dropdown: ComponentType<
    InputProps & {
      preventTruncate?: boolean
      variation?: 'default' | 'inline'
      options: Array<
        Pick<HTMLProps<HTMLInputElement>, 'disabled' | 'value'> & Label
      >
      selectTestId?: string
    }
  >

  export const Dropzone: ComponentType<
    PropsWithChildren<{
      onDropAccepted: (files: File[]) => void
      onDropRejected?: (files: File[]) => void
      onFileReset?: (files: File[]) => void
      accept?: string
      icon?: ReactNode
      isLoading?: boolean
      maxSize?: number
      minSize?: number
      multiple?: boolean
    }>
  >

  export const IconWarning
  export const IconCheck

  export const Input: ComponentType<InputProps>

  export const InputSearch: ComponentType<
    InputProps & Pick<HTMLProps<HTMLInputElement>, 'onSubmit'>
  >

  /**
   * A input with a button should be used in scenarios where the field needs its own button. Newsletter sign up, postal code input and promo code application are some common use case examples.
   */
  export const InputButton: ComponentType<
    InputProps & {
      button?: string
      buttonProps?: ButtonProps
    }
  >

  export const InputCurrency: ComponentType<
    InputProps & {
      currencyCode: string
      locale: string
    }
  >

  export const InputPassword: ComponentType<InputProps>

  export const IconCaretDown
  export const IconCaretUp
  export const IconArrowDown
  export const IconArrowBack
  export const IconArrowUp
  export const IconClose
  export const IconExternalLink
  export const IconSearch
  export const IconSuccess
  export const IconCopy
  export const IconCog

  /**
   * A Radio Group represents a need for the user to make a choice among a few offered options.
   */
  export const RadioGroup: ComponentType<
    Pick<
      HTMLProps<HTMLInputElement>,
      'name' | 'disabled' | 'value' | 'onChange'
    > &
      Pick<InputProps, 'errorMessage' | 'error' | 'size'> &
      Label & {
        /**
         * Options list
         */
        options: Array<
          Pick<HTMLProps<HTMLInputElement>, 'value' | 'disabled'> & Label
        >

        /**
         * Hide group border
         */
        hideBorder?: boolean
      }
  >

  /**
   * A Selectable Card represents a need for the user to make a choice among a few offered options.
   */
  export const SelectableCard: ComponentType<
    PropsWithChildren<{
      /**
       * Use this to group cards on the left.
       */
      hasGroupLeft?: boolean

      /**
       * Use this to group cards on the right.
       */
      hasGroupRight?: boolean

      /**
       * Use the full size of the card.
       */
      noPadding?: boolean
      selected?: boolean
    }> &
      Pick<HTMLProps<HTMLButtonElement>, 'onClick'>
  >

  export const Slider: ComponentType<
    {
      /**
       * Whether to always display current value as a popup
       */
      alwaysShowCurrentValue?: boolean

      /**
       * Initial values
       */
      defaultValues?: number[]

      /**
       * Function to customize the format of the value
       */
      formatValue?: (value: number) => number

      /**
       * Optional icon to show inside the slider handle
       */
      handleIcon?: ReactNode

      /**
       * Maximum supported value
       */
      max?: number

      /**
       * Mininum supported value
       */
      min?: number

      /**
       * *onChange* event
       */
      onChange?: (values?: number[]) => void

      /**
       * Wheter to render as a range input
       */
      range?: boolean

      /**
       * Step value
       */
      step?: number

      /**
       * Current value: [left, right]
       */
      values?: number[]
    } & Pick<HTMLProps<HTMLInputElement>, 'disabled'>
  >

  /**
   * A Toggle is a control for turning an option ON or OFF. Its effect is usually automatically applied, which is one of the main differences compared to checkboxes, that need a submit.
   */
  export const Toggle: ComponentType<
    Pick<
      HTMLProps<HTMLInputElement>,
      'id' | 'onClick' | 'onChange' | 'checked' | 'disabled' | 'name'
    > &
      Pick<InputProps, 'helpText'> &
      PropsWithSize & {
        semantic?: boolean
      }
  >

  export const Textarea: ComponentType<
    Pick<InputProps, 'helpText' | 'error' | 'errorMessage' | 'dataAttributes'> &
      Override<
        HTMLProps<HTMLTextAreaElement>,
        {
          /**
           * Helper text for character countdown (X characters left).
           *
           * Requires specified `maxLength` value.
           */
          characterCountdownText?: 'string'

          /**
           * Controls if Textarea is resizable and the resize direction.
           */
          resize?: 'both' | 'horizontal' | 'none' | 'vertical'
        }
      >
  >

  export const Link: ComponentType<
    Pick<HTMLProps<HTMLAnchorElement>, 'href' | 'target'> &
      PropsWithChildren & {
        /**
         * Weight property
         */
        mediumWeight?: boolean
      }
  >

  export const Tooltip: ComponentType<
    Label &
      PropsWithChildren<{
        /**
         * Container element for the popup's portal to be rendered (default: document.body)
         */
        container?: ReactNode

        /**
         * Delay to show and hide the tooltip (ms)
         */
        delay?: number

        /**
         * Tooltip animation duration (ms)
         */
        duration?: number

        /**
         * Fallback position. Used when the tooltip cannot be shown in the original position
         */
        fallbackosition?: 'top' | 'right' | 'bottom' | 'left'

        /**
         * Tooltip position
         */
        position?: 'top' | 'right' | 'bottom' | 'left'

        /**
         * Tooltip font size
         */
        size?: 'mini' | 'small'

        /**
         * Tooltip timming function used to animate the tooltip
         */
        timmingFn?: string

        /**
         * Event to trigger the tooltip
         */
        trigger?: 'click' | 'hover' | 'focus'

        /**
         * Element that inserts line break style in the word. Used to prevent width overflow
         */
        wordBreak?: 'normal' | 'break-all' | 'keep-all' | 'break-word'
      }>
  >

  /**
   * Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success.
   *
   * ## VTEX IO
   *
   * VTEX IO stores already have a ToastProvider rendered, so in most cases it is not necessary to render it again.
   */
  export const ToastProvider: ComponentType<
    PropsWithChildren<{
      /**
       * Sets the position of the toasts based either on the dimensions of the parent element of the ToastProvider, or window dimensions
       */
      positioning: 'parent' | 'window'
    }>
  >

  export const ToastConsumer

  /**
   * Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success.Toasts give users instant feedback about the tasks they just did. Its main objective is to ensure tasks confirmation and success.
   */
  export const ToastContext: React.Context<{
    showToast: (
      data:
        | string
        | {
            message: string
            action?: {
              label: string
              onClick: () => void
            }
          }
    ) => void
  }>

  export const Pagination

  export const Collapsible: ComponentType<
    PropsWithChildren<{
      /**
       * Component to be used as the header of the collapsible.
       */
      header: ReactNode

      /**
       * Caret alignment. Use right alignment only in small width scenarios.
       */
      align?: 'right' | 'left'

      /**
       * Vertical position of arrow icon.
       */
      arrowAlign?: 'center' | 'start' | 'end' | 'baseline' | 'stretch'

      /**
       * Color or semantic to be applied to the Caret Icon in the Collapsible header.
       */
      caretColor?: 'base' | 'primary' | 'muted'

      /**
       * Controls whether the collapsible is open or not.
       */
      isOpen?: boolean

      /**
       * Controls whether the collapsible should hide overflowing components. (e.g. Turn the overflow off to avoid popup menus in the childen component to be cropped.)
       */
      isOverflowHidden?: boolean

      /**
       * *onClick* event.
       */
      onClick?: (e: { target: { isOpen: boolean } }) => void
    }>
  >

  /**
   * This is a special case of a regular numerical input where you expect the user to modify it by a few incremental steps.
   */
  export const NumericStepper: ComponentType<
    Pick<HTMLProps<HTMLInputElement>, 'onChange' | 'readOnly'> &
      Label<string> & {
        /**
         * Block or default size.
         */
        block?: boolean

        /**
         * Default value in case of invalid input (e.g. letters) and there is no minimum value
         */
        defaultValue?: number

        /**
         * Lean mode, with subtler styling
         */
        lean?: boolean

        /**
         * Maximum value (null or Infinity in case there is no maximum. Default is Infinity)
         */
        maxValue?: number

        /**
         * Minimum value (will be the default value in case of invalid input, e.g. letters). Set to null or -Infinity in case there is no miminum. Default is 0.
         */
        minValue?: number

        /**
         * Input size
         */
        size?: Size

        /**
         * Suffix (e.g Kg, un)
         */
        suffix?: string

        /**
         * Multiplier value (e.g 1, 0.3)
         */
        unitMultiplier?: number

        /**
         * Value of the input
         */
        value?: number
      }
  >

  export const EmptyState

  export const Spinner: ComponentType<{
    /**
     * Sets the display to block
     */
    block?: boolean

    /**
     * Color of the spinner
     */
    color?: string

    /**
     * Size (diameter) of the spinner
     */
    size?: number
  }>

  export const Tag: ComponentType<
    PropsWithChildren &
      Pick<HTMLProps<HTMLButtonElement>, 'onClick' | 'disabled'> & {
        size?: Size
        type?: 'success' | 'error' | 'warning'
        variation?: 'default' | 'low'

        /**
         * Background color
         */
        bgColor?: string

        /**
         * Text color
         */
        color?: string
      }
  >

  export const Progress: ComponentType<
    | ProgressTypeProps<
        'steps',
        {
          steps: Array<'completed' | 'inProgress' | 'toDo'>
          slim?: boolean
        }
      >
    | ProgressTypeProps<
        'line',
        {
          percent: string | number
        }
      >
  >

  export const Layout

  /**
   * Tabs are navigation solutions for alternating between content that is in the same level of hierarchy.
   */
  export const Tabs: ComponentType<
    PropsWithChildren<{
      fullWidth?: boolean
      sticky?: boolean
    }>
  >

  export const Tab: ComponentType<
    Label &
      Pick<HTMLProps<HTMLButtonElement>, 'disabled'> &
      PropsWithChildren<{
        active?: boolean
        onClick?: () => void
      }>
  >

  export const Divider
  export const PageBlock
}
