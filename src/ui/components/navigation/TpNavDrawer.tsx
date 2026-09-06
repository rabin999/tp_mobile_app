import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tpCorners } from '../../theme/tpCorners';
import { tpNunito } from '../../theme/tpFonts';
import { tpSizes } from '../../theme/tpSizes';
import { tpSpacing } from '../../theme/tpSpacing';
import { useTpTheme } from '../../theme/tpTheme';
import { TpButton } from '../actions/TpButton';
import { TpAvatar } from '../content/TpAvatar';
import { TpChip } from '../content/TpChip';
import { TpGlyph, type TpGlyphName } from '../content/TpGlyph';
import { TpRating } from '../content/TpRating';
import { TpVerificationBadge } from '../content/TpVerificationBadge';
import { TpLogo } from './TpLogo';

/**
 * Copyright line matching the web footer (`© 2019–{year} …`).
 */
export function tpCopyrightNotice({
  now,
  foundedYear = 2019,
  companyName = 'True Professional',
}: {
  now?: Date;
  foundedYear?: number;
  companyName?: string;
} = {}): string {
  const year = (now ?? new Date()).getFullYear();
  const range =
    year > foundedYear ? `${foundedYear}-${year}` : `${foundedYear}`;

  return `© ${range} ${companyName}. All rights reserved.`;
}

export type TpNavDrawerItem = {
  label: string;
  icon: TpGlyphName;
  active?: boolean;
};

export type TpNavDrawerSection = {
  title: string;
  items: TpNavDrawerItem[];
};

export type TpNavDrawerProfile = {
  name: string;
  roleLabel: string;
  initials?: string;
  rating?: number;
  reviewsLabel?: string;
  verified?: boolean;
  verificationMessage?: string;
};

/**
 * Guest sections matching MobilePublicNavDrawer when logged out.
 */
export function tpGuestNavDrawerSections({
  activeLabel,
}: {
  activeLabel?: string;
} = {}): TpNavDrawerSection[] {
  const active = (label: string) => label === activeLabel;

  return [
    {
      title: 'Discover',
      items: [
        { label: 'Home', icon: 'home', active: active('Home') },
        {
          label: 'Professionals',
          icon: 'people',
          active: active('Professionals'),
        },
        { label: 'Tasks', icon: 'work', active: active('Tasks') },
        { label: 'Services', icon: 'menuBook', active: active('Services') },
      ],
    },
    {
      title: 'About',
      items: [
        { label: 'About Us', icon: 'info', active: active('About Us') },
        {
          label: 'Become a Provider',
          icon: 'addBusiness',
          active: active('Become a Provider'),
        },
        {
          label: 'Customer Stories',
          icon: 'starOutline',
          active: active('Customer Stories'),
        },
        { label: 'Contact', icon: 'mail', active: active('Contact') },
      ],
    },
    {
      title: 'Help',
      items: [{ label: 'FAQ', icon: 'help', active: active('FAQ') }],
    },
    {
      title: 'Legal',
      items: [
        {
          label: 'Privacy Policy',
          icon: 'privacy',
          active: active('Privacy Policy'),
        },
        {
          label: 'Terms & Conditions',
          icon: 'gavel',
          active: active('Terms & Conditions'),
        },
        {
          label: 'Community Guidelines',
          icon: 'groups',
          active: active('Community Guidelines'),
        },
      ],
    },
  ];
}

export type TpNavDrawerProps = {
  visible: boolean;
  sections: TpNavDrawerSection[];
  onItemTap?: (label: string) => void;
  closeTooltip?: string;
  onClose?: () => void;
  loginLabel?: string;
  signupLabel?: string;
  onLogin?: () => void;
  onSignup?: () => void;
  profile?: TpNavDrawerProfile;
  copyright?: string;
  onLogout?: () => void;
  logoutLabel?: string;
};

/**
 * Static public navigation drawer. Opens from the right with no window fade.
 */
export function TpNavDrawer({
  visible,
  sections,
  onItemTap,
  closeTooltip = 'Close navigation menu',
  onClose,
  loginLabel = 'Log in',
  signupLabel = 'Sign up',
  onLogin,
  onSignup,
  profile,
  copyright,
  onLogout,
  logoutLabel = 'Logout',
}: TpNavDrawerProps) {
  const { colors } = useTpTheme();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const drawerWidth = width * 0.85 < 320 ? width * 0.85 : 320;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalRoot}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={closeTooltip}
          onPress={onClose}
          style={styles.scrim}
        />
        <View
          style={[
            styles.panel,
            {
              width: drawerWidth,
              backgroundColor: colors.surface,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          <DrawerHeader closeTooltip={closeTooltip} onClose={onClose} />
          <View style={styles.authPad}>
            {profile == null ? (
              <GuestAuth
                loginLabel={loginLabel}
                signupLabel={signupLabel}
                onLogin={onLogin}
                onSignup={onSignup}
              />
            ) : (
              <AuthedHeader profile={profile} />
            )}
          </View>
          <View
            style={[styles.sectionRule, { backgroundColor: colors.divider }]}
          />
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.listPad}
          >
            {sections.map(section => (
              <View key={section.title}>
                <Text
                  style={[styles.sectionTitle, { color: colors.textSecondary }]}
                >
                  {section.title.toUpperCase()}
                </Text>
                {section.items.map(item => (
                  <DrawerRow
                    key={item.label}
                    item={item}
                    onPress={() => onItemTap?.(item.label)}
                  />
                ))}
              </View>
            ))}
            {profile != null ? (
              <>
                <View
                  style={[
                    styles.logoutRule,
                    { backgroundColor: colors.divider },
                  ]}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={logoutLabel}
                  onPress={onLogout}
                  style={styles.logoutRow}
                >
                  <TpGlyph
                    name="logout"
                    size={tpSizes.iconSm}
                    color={colors.error}
                  />
                  <View style={styles.logoutGap} />
                  <Text
                    style={{
                      fontSize: 14,
                      ...tpNunito('600'),
                      color: colors.error,
                    }}
                  >
                    {logoutLabel}
                  </Text>
                </Pressable>
              </>
            ) : null}
          </ScrollView>
          <DrawerFooter copyright={copyright ?? tpCopyrightNotice()} />
        </View>
      </View>
    </Modal>
  );
}

function DrawerHeader({
  closeTooltip,
  onClose,
}: {
  closeTooltip: string;
  onClose?: () => void;
}) {
  const { colors } = useTpTheme();

  return (
    <View style={[styles.header, { borderBottomColor: colors.outlineVariant }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={closeTooltip}
        onPress={onClose}
        style={styles.close}
      >
        <TpGlyph
          name="close"
          size={tpSizes.icon}
          color={colors.onSurfaceVariant}
        />
      </Pressable>
      <View style={styles.headerSpacer} />
      <TpLogo />
    </View>
  );
}

function GuestAuth({
  loginLabel,
  signupLabel,
  onLogin,
  onSignup,
}: {
  loginLabel: string;
  signupLabel: string;
  onLogin?: () => void;
  onSignup?: () => void;
}) {
  return (
    <View>
      <TpButton label={loginLabel} expanded weight="700" onPress={onLogin} />
      <View style={styles.authGap} />
      <TpButton
        label={signupLabel}
        expanded
        variant="outlined"
        weight="700"
        onPress={onSignup}
      />
    </View>
  );
}

function AuthedHeader({ profile }: { profile: TpNavDrawerProfile }) {
  const { colors, text } = useTpTheme();

  return (
    <View>
      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.primaryContainer },
        ]}
      >
        <View>
          <TpAvatar initials={profile.initials ?? profile.name} size={44} />
          {profile.verified ? (
            <View style={styles.verified}>
              <TpVerificationBadge verified />
            </View>
          ) : null}
        </View>
        <View style={styles.profileGap} />
        <View style={styles.flex}>
          <Text
            numberOfLines={1}
            style={[
              text.labelLarge,
              {
                ...tpNunito('700'),
                color: colors.onSurfaceVariant,
                lineHeight: 18,
              },
            ]}
          >
            {profile.name}
          </Text>
          <View style={styles.chipGap} />
          <TpChip label={profile.roleLabel} variant="assist" />
          {profile.rating != null ? (
            <>
              <View style={styles.chipGap} />
              <View style={styles.ratingRow}>
                <TpRating value={1} max={1} size={12} />
                <View style={styles.ratingGap} />
                <Text
                  style={[
                    text.labelMedium,
                    {
                      ...tpNunito('700'),
                      color: colors.onSurfaceVariant,
                    },
                  ]}
                >
                  {profile.rating.toFixed(1)}
                </Text>
                {profile.reviewsLabel != null ? (
                  <Text
                    style={[text.labelSmall, { color: colors.textSecondary }]}
                  >
                    {profile.reviewsLabel}
                  </Text>
                ) : null}
              </View>
            </>
          ) : null}
        </View>
      </View>
      {!profile.verified && profile.verificationMessage != null ? (
        <>
          <View style={styles.bannerGap} />
          <TpVerificationBadge
            verified={false}
            variant="banner"
            bannerMessage={profile.verificationMessage}
          />
        </>
      ) : null}
    </View>
  );
}

function DrawerRow({
  item,
  onPress,
}: {
  item: TpNavDrawerItem;
  onPress?: () => void;
}) {
  const { colors, text } = useTpTheme();
  const color = item.active ? colors.primary : colors.onSurfaceVariant;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: item.active }}
      onPress={onPress}
      style={[
        styles.row,
        {
          backgroundColor: item.active
            ? colors.primaryContainer
            : 'transparent',
        },
      ]}
    >
      <TpGlyph name={item.icon} size={tpSizes.iconSm} color={color} />
      <View style={styles.rowGap} />
      <Text
        numberOfLines={1}
        style={[
          text.labelLarge,
          {
            flex: 1,
            ...tpNunito(item.active ? '700' : '600'),
            color,
          },
        ]}
      >
        {item.label}
      </Text>
    </Pressable>
  );
}

function DrawerFooter({ copyright }: { copyright: string }) {
  const { colors, text } = useTpTheme();
  const iconColor = colors.onSurfaceVariant;

  return (
    <View style={[styles.footer, { borderTopColor: colors.outlineVariant }]}>
      <View style={styles.social}>
        <TpGlyph name="facebook" size={tpSizes.iconSm} color={iconColor} />
        <View style={styles.socialGap} />
        <TpGlyph name="camera" size={tpSizes.iconSm} color={iconColor} />
        <View style={styles.socialGap} />
        <TpGlyph name="music" size={tpSizes.iconSm} color={iconColor} />
        <View style={styles.socialGap} />
        <TpGlyph name="work" size={tpSizes.iconSm} color={iconColor} />
        <View style={styles.socialGap} />
        <TpGlyph name="mail" size={tpSizes.iconSm} color={iconColor} />
      </View>
      <View style={styles.copyGap} />
      <Text style={[text.bodySmall, { color: colors.textSecondary }]}>
        {copyright}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  panel: {
    height: '100%',
    borderTopLeftRadius: tpCorners.md,
    borderBottomLeftRadius: tpCorners.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingLeft: tpSpacing.md - 12,
    paddingRight: tpSpacing.md,
    paddingVertical: tpSpacing.sm,
  },
  close: {
    width: tpSizes.control,
    height: tpSizes.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: {
    flex: 1,
  },
  authPad: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.md,
  },
  authGap: {
    height: 8,
  },
  sectionRule: {
    height: 1,
    marginHorizontal: tpSpacing.md,
  },
  flex: {
    flex: 1,
  },
  listPad: {
    paddingHorizontal: tpSpacing.xs,
    paddingVertical: tpSpacing.xs,
  },
  sectionTitle: {
    paddingHorizontal: tpSpacing.md,
    paddingVertical: 6,
    fontSize: 11,
    ...tpNunito('700'),
    letterSpacing: 0.4,
  },
  row: {
    minHeight: 44,
    marginHorizontal: tpSpacing.xs,
    marginVertical: 2,
    paddingHorizontal: tpSpacing.xs,
    borderRadius: tpCorners.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowGap: {
    width: tpSpacing.sm,
  },
  logoutRule: {
    height: 1,
    marginHorizontal: tpSpacing.md,
    marginVertical: tpSpacing.md / 2,
  },
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.sm,
  },
  logoutGap: {
    width: 10,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: tpSpacing.md,
    paddingVertical: tpSpacing.sm,
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialGap: {
    width: tpSpacing.sm,
  },
  copyGap: {
    height: 6,
  },
  profileCard: {
    borderRadius: tpCorners.xs,
    padding: tpSpacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileGap: {
    width: tpSpacing.sm,
  },
  chipGap: {
    height: tpSpacing.xxs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingGap: {
    width: tpSpacing.xxs,
  },
  bannerGap: {
    height: tpSpacing.xs,
  },
  verified: {
    position: 'absolute',
    right: -1,
    bottom: -1,
  },
});
