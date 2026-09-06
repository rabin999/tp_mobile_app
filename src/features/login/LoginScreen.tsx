import { Pressable, StyleSheet, Text, View } from 'react-native';

import { TpButton } from '../../ui/components/actions/TpButton';
import { TpFormActions } from '../../ui/components/actions/TpFormActions';
import { TpKeyboardScrollView } from '../../ui/components/content/TpKeyboardScrollView';
import { TpSnackbar } from '../../ui/components/feedback/TpSnackbar';
import { TpCheckbox } from '../../ui/components/inputs/TpCheckbox';
import { TpPasswordField } from '../../ui/components/inputs/TpPasswordField';
import { TpTextField } from '../../ui/components/inputs/TpTextField';
import { TpAlert } from '../../ui/components/overlays/TpAlert';
import { tpCorners } from '../../ui/theme/tpCorners';
import { tpNunito } from '../../ui/theme/tpFonts';
import { tpSpacing } from '../../ui/theme/tpSpacing';
import { useTpTheme } from '../../ui/theme/tpTheme';
import { loginRoles, type LoginRole } from './login';
import { loginText } from './loginText';
import { submitLogin } from './submitLogin';
import { useLoginForm, type LoginFormModel } from './useLogin';

export type LoginScreenProps = {
  onSignedIn?: () => void;
};

/**
 * Public sign-in form.
 */
export function LoginScreen({ onSignedIn }: LoginScreenProps) {
  const { colors, text } = useTpTheme();
  const form = useLoginForm(submitLogin);

  const onSubmit = async () => {
    const signedIn = await form.send();

    if (signedIn) {
      TpSnackbar.show({
        message: loginText.signedIn,
        tone: 'success',
      });
      onSignedIn?.();
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.surface }]}>
      <TpKeyboardScrollView>
        <View style={styles.section}>
          <View style={styles.intro}>
            <Text
              style={[
                text.headlineMedium,
                styles.center,
                styles.title,
                { color: colors.primary },
              ]}
            >
              {loginText.title}
            </Text>
            <Text
              style={[
                text.bodyLarge,
                styles.center,
                styles.fullWidth,
                { color: colors.textSecondary },
              ]}
            >
              {loginText.subheadBefore}
              <Text
                style={[
                  text.bodyLarge,
                  tpNunito('400'),
                  { color: colors.primary },
                ]}
              >
                {loginText.brand}
              </Text>
              {loginText.subheadAfter}
            </Text>
          </View>
          <LoginForm form={form} onSubmit={onSubmit} />
          <View style={styles.footer}>
            <Text
              style={[
                text.bodyLarge,
                styles.center,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {loginText.noAccount}
            </Text>
            <Text
              style={[
                text.bodyLarge,
                tpNunito('400'),
                styles.signUp,
                { color: colors.primary },
              ]}
            >
              {loginText.signUp}
            </Text>
          </View>
        </View>
      </TpKeyboardScrollView>
    </View>
  );
}

function LoginForm({
  form,
  onSubmit,
}: {
  form: LoginFormModel;
  onSubmit: () => void;
}) {
  const canSend = !form.sending;

  return (
    <View>
      {form.formError != null ? (
        <TpAlert
          message={form.formError}
          severity="error"
          marginBottom={tpSpacing.md}
          onClosed={form.dismissFormError}
        />
      ) : null}
      <LoginRoleTabs value={form.draft.loginAs} onChanged={form.setLoginAs} />
      <View style={styles.usernameSlot}>
        <TpTextField
          label={loginText.username}
          value={form.draft.username}
          autoComplete="username"
          onChangeText={form.setUsername}
          errorText={form.fieldErrors.username}
        />
      </View>
      <View style={styles.passwordBlock}>
        <View style={styles.passwordSlot}>
          <TpPasswordField
            label={loginText.password}
            value={form.draft.password}
            onChangeText={form.setPassword}
            errorText={form.fieldErrors.password}
          />
        </View>
        <View style={styles.persistRow}>
          <TpCheckbox
            value={form.draft.persistLogin}
            label={loginText.persistLogin}
            onChanged={form.setPersistLogin}
          />
        </View>
      </View>
      <View style={styles.submitWrap}>
        <TpFormActions
          primary={
            <TpButton
              label={loginText.submit}
              loading={form.sending}
              expanded
              onPress={
                canSend
                  ? () => {
                      onSubmit();
                    }
                  : undefined
              }
            />
          }
        />
      </View>
    </View>
  );
}

function LoginRoleTabs({
  value,
  onChanged,
}: {
  value: LoginRole;
  onChanged: (role: LoginRole) => void;
}) {
  const { colors, text } = useTpTheme();

  return (
    <View style={styles.roleRow}>
      <View
        accessibilityRole="tablist"
        style={[styles.roleTrack, { backgroundColor: colors.primaryContainer }]}
      >
        {loginRoles.map(role => {
          const selected = role === value;
          const label =
            role === 'CUSTOMER'
              ? loginText.customer
              : loginText.serviceProvider;

          return (
            <Pressable
              key={role}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              onPress={() => onChanged(role)}
              style={[
                styles.roleTab,
                {
                  backgroundColor: selected ? colors.surface : 'transparent',
                  borderColor: selected
                    ? colors.tabIndicatorBorder
                    : 'transparent',
                },
              ]}
            >
              <Text
                style={[
                  text.labelLarge,
                  tpNunito(selected ? '700' : '600'),
                  {
                    color: selected ? colors.primary : colors.textSecondary,
                  },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  section: {
    paddingHorizontal: tpSpacing.lg,
    paddingTop: tpSpacing.lg + tpSpacing.xxl + tpSpacing.xl + tpSpacing.xxs,
    paddingBottom: tpSpacing.lg + tpSpacing.xxl + tpSpacing.xxl + tpSpacing.md,
  },
  intro: {
    width: '100%',
    marginBottom: tpSpacing.xxl + tpSpacing.md,
  },
  title: {
    marginBottom: tpSpacing.xs,
  },
  center: {
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
    alignSelf: 'stretch',
  },
  usernameSlot: {
    marginBottom: tpSpacing.xs,
  },
  passwordBlock: {
    marginBottom: tpSpacing.sm,
  },
  passwordSlot: {
    marginBottom: tpSpacing.xs,
  },
  persistRow: {
    marginVertical: tpSpacing.xs,
  },
  footer: {
    width: '100%',
    marginTop: tpSpacing.xxl + tpSpacing.xs,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUp: {
    marginLeft: tpSpacing.xs,
  },
  roleRow: {
    alignItems: 'flex-end',
    marginBottom: tpSpacing.xl,
  },
  roleTrack: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderRadius: tpCorners.pill,
  },
  roleTab: {
    paddingVertical: 6,
    paddingHorizontal: tpSpacing.xl,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: tpCorners.pill,
  },
  submitWrap: {
    width: '50%',
    alignSelf: 'center',
    marginVertical: tpSpacing.sm,
  },
});
