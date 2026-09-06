import { StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { tpAssets } from '../../theme/tpAssets';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpButton } from '../actions/TpButton';
import { TpIllustration } from '../content/TpIllustration';

export type TpStatusArt =
  | 'noResults'
  | 'loginGate'
  | 'otp'
  | 'posts'
  | 'error'
  | 'notFound';

export type TpStatusVariant = 'empty' | 'error';

export type TpStatusPageProps = {
  title: string;
  message?: string;
  illustration?: TpStatusArt;
  variant?: TpStatusVariant;
  actionLabel?: string;
  onAction?: () => void;
};

export type TpEmptyIllustration = Extract<
  TpStatusArt,
  'noResults' | 'loginGate' | 'otp' | 'posts'
>;

export type TpErrorIllustration = Extract<TpStatusArt, 'error' | 'notFound'>;

export type TpEmptyStateProps = Omit<
  TpStatusPageProps,
  'variant' | 'illustration'
> & {
  illustration?: TpEmptyIllustration;
};

export type TpErrorStateProps = Omit<
  TpStatusPageProps,
  'variant' | 'illustration'
> & {
  illustration?: TpErrorIllustration;
};

const art: Record<TpStatusArt, ImageSourcePropType> = {
  noResults: tpAssets.empty,
  loginGate: tpAssets.mail,
  otp: tpAssets.otp,
  posts: tpAssets.posts,
  error: tpAssets.error,
  notFound: tpAssets.notFound,
};

/**
 * Shared empty / error page. Pass `illustration` and copy from the
 * calling screen — do not fork a second layout.
 */
export function TpStatusPage({
  title,
  message,
  illustration = 'noResults',
  variant = 'empty',
  actionLabel,
  onAction,
}: TpStatusPageProps) {
  const { colors, text } = useTpTheme();
  const error = variant === 'error';

  return (
    <View style={[styles.body, error ? styles.errorPad : styles.emptyPad]}>
      <TpIllustration
        source={art[illustration]}
        width={tpSizes.feedbackArt}
        semanticLabel={title}
      />
      <View style={error ? styles.errorTitleGap : styles.emptyTitleGap} />
      <Text
        style={[
          error ? text.headlineSmall : text.titleMedium,
          {
            ...tpNunito(error ? '500' : '600'),
            color: error ? colors.textHint : colors.onSurface,
            textAlign: 'center',
          },
        ]}
      >
        {title}
      </Text>
      {message != null ? (
        <>
          <View
            style={error ? styles.errorMessageGap : styles.emptyMessageGap}
          />
          <Text
            style={[
              text.bodyMedium,
              {
                color: error ? colors.onSurface : colors.textSecondary,
                ...tpNunito('400'),
                textAlign: 'center',
              },
            ]}
          >
            {message}
          </Text>
        </>
      ) : null}
      {actionLabel != null ? (
        <>
          <View style={error ? styles.errorActionGap : styles.emptyActionGap} />
          <TpButton label={actionLabel} variant="outlined" onPress={onAction} />
        </>
      ) : null}
    </View>
  );
}

/**
 * Empty listing. Prefer `TpStatusPage` when the screen already branches
 * on empty vs error — pass `illustration` there instead of a new widget.
 */
export function TpEmptyState({
  illustration = 'noResults',
  ...rest
}: TpEmptyStateProps) {
  return <TpStatusPage variant="empty" illustration={illustration} {...rest} />;
}

/**
 * Error / 404. Same layout as empty; only type and default art differ.
 */
export function TpErrorState({
  illustration = 'notFound',
  ...rest
}: TpErrorStateProps) {
  return <TpStatusPage variant="error" illustration={illustration} {...rest} />;
}

const styles = StyleSheet.create({
  body: {
    alignItems: 'center',
    width: '100%',
  },
  emptyPad: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.xxl,
  },
  errorPad: {
    padding: tpSpacing.lg,
    paddingTop: tpSpacing.xxl,
  },
  emptyTitleGap: {
    height: tpSpacing.xxl,
  },
  errorTitleGap: {
    height: tpSpacing.md,
  },
  emptyMessageGap: {
    height: tpSpacing.md,
  },
  errorMessageGap: {
    height: tpSpacing.xs,
  },
  emptyActionGap: {
    height: tpSpacing.xl,
  },
  errorActionGap: {
    height: tpSpacing.md,
  },
});
