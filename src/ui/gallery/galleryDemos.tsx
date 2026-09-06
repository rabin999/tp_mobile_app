import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  showTpBottomSheet,
  TpAlert,
  TpAvatar,
  TpBackButtonOnMedia,
  TpButton,
  TpCheckbox,
  TpChip,
  TpClearButton,
  TpConfirmSheet,
  TpDateField,
  TpDivider,
  TpFilterIconButton,
  TpFormActions,
  TpHeaderTabs,
  TpIconButton,
  TpImage,
  TpNotificationBadge,
  TpOtpField,
  TpOverflowMenu,
  TpPageHeader,
  TpPagination,
  TpPasswordField,
  TpRadioPill,
  TpRating,
  TpSearchField,
  TpSelect,
  TpSnackbar,
  TpSocialButton,
  TpSortToggle,
  TpSpinner,
  TpStatusBadge,
  TpStatusPage,
  TpSvgIcon,
  TpSwitch,
  TpTextField,
  TpVerificationBadge,
  type TpSortDirection,
} from '../components';
import { tpAssets } from '../theme/tpAssets';
import { tpColors } from '../theme/tpColors';
import { tpSpacing } from '../theme/tpSpacing';
import { useTpTheme } from '../theme/tpTheme';
import { TpGlyph } from '../components/content/TpGlyph';
import { GallerySection } from './GallerySection';
import { GalleryTokens } from './GalleryTokens';

export type GalleryDemoProps = {
  id: string;
};

/**
 * Kit demos loaded only after the gallery index chooses a primitive.
 */
export function GalleryDemo({ id }: GalleryDemoProps) {
  switch (id) {
    case 'buttons':
      return <ButtonsDemo />;
    case 'inputs':
      return <InputsDemo />;
    case 'search':
      return <SearchDemo />;
    case 'navigation':
      return <NavigationDemo />;
    case 'overlays':
      return <OverlaysDemo />;
    case 'loading':
      return <LoaderDemo />;
    case 'empty-error':
      return <EmptyErrorDemo />;
    case 'content':
      return <ContentDemo />;
    case 'tokens':
      return <GalleryTokens />;
    default:
      return null;
  }
}

function ButtonsDemo() {
  return (
    <View>
      <GallerySection title="Actions">
        <View style={styles.wrap}>
          <TpButton label="Primary" onPress={() => undefined} />
          <TpButton
            label="Outlined"
            variant="outlined"
            onPress={() => undefined}
          />
          <TpButton label="Text" variant="text" onPress={() => undefined} />
          <TpButton label="Disabled" />
          <TpButton label="Saving" loading />
        </View>
        <View style={styles.mdGap} />
        <TpButton label="Log in" expanded onPress={() => undefined} />
        <View style={styles.xsGap} />
        <TpButton
          label="Sign up"
          expanded
          variant="outlined"
          onPress={() => undefined}
        />
        <View style={styles.mdGap} />
        <TpFormActions
          primary={<TpButton label="Send" onPress={() => undefined} />}
        />
        <View style={styles.mdGap} />
        <TpFormActions
          cancel={
            <TpButton
              label="Cancel"
              variant="text"
              tone="neutral"
              onPress={() => undefined}
            />
          }
          primary={<TpButton label="Apply" onPress={() => undefined} />}
        />
      </GallerySection>
      <GallerySection title="Social">
        <TpSocialButton
          provider="google"
          label="Sign up with Google"
          onPress={() => undefined}
        />
        <View style={styles.smGap} />
        <TpSocialButton
          provider="facebook"
          label="Sign up with Facebook"
          onPress={() => undefined}
        />
      </GallerySection>
      <GallerySection title="Icon actions">
        <IconActionsDemo />
      </GallerySection>
    </View>
  );
}

function IconActionsDemo() {
  return (
    <View style={styles.row}>
      <TpIconButton
        tooltip="Search"
        icon={<TpGlyph name="search" />}
        onPress={() => undefined}
      />
      <TpFilterIconButton
        tooltip="Filters"
        badgeCount={2}
        onPress={() => undefined}
      />
      <View style={styles.flex} />
      <TpOverflowMenu
        tooltip="More"
        items={[
          { label: 'Edit', onPress: () => undefined },
          { label: 'Delete', destructive: true, onPress: () => undefined },
        ]}
      />
      <View style={styles.smWidth} />
      <TpClearButton label="Clear all" onPress={() => undefined} />
    </View>
  );
}

function InputsDemo() {
  return (
    <View>
      <GallerySection title="Text">
        <TpTextField label="Name" hint="Your name" />
        <View style={styles.smGap} />
        <TpTextField label="Email" errorText="Enter a valid email" />
        <View style={styles.smGap} />
        <TpTextField label="Disabled" enabled={false} />
      </GallerySection>
      <GallerySection title="Password">
        <TpPasswordField label="Password" />
      </GallerySection>
      <GallerySection title="Select">
        <SelectDemo />
      </GallerySection>
      <GallerySection title="Checkbox">
        <CheckboxDemo />
      </GallerySection>
      <GallerySection title="Radio pills">
        <RadioDemo />
      </GallerySection>
      <GallerySection title="Switch">
        <SwitchDemo />
      </GallerySection>
      <GallerySection title="OTP">
        <OtpDemo />
      </GallerySection>
      <GallerySection title="Date">
        <DateDemo />
      </GallerySection>
      <GallerySection title="Sort">
        <SortDemo />
      </GallerySection>
    </View>
  );
}

function SearchDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.searchRow}>
      <View style={styles.flex}>
        <TpSearchField
          hint="Search"
          loading={loading}
          onChangeText={value => setLoading(value.length > 0)}
        />
      </View>
      <TpFilterIconButton tooltip="Filters" onPress={() => undefined} />
    </View>
  );
}

function SelectDemo() {
  const [value, setValue] = useState<string | undefined>('Kathmandu');

  return (
    <TpSelect
      label="City"
      items={['Kathmandu', 'Pokhara', 'Lalitpur']}
      value={value}
      labelBuilder={item => item}
      onChanged={setValue}
    />
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <TpCheckbox
      value={checked}
      label="I agree to the terms of service"
      onChanged={setChecked}
    />
  );
}

function RadioDemo() {
  const [radio, setRadio] = useState('provider');

  return (
    <View>
      <TpRadioPill
        label="I am a service provider"
        selected={radio === 'provider'}
        onPress={() => setRadio('provider')}
      />
      <View style={styles.xsGap} />
      <TpRadioPill
        label="I am looking for professionals"
        selected={radio === 'seeker'}
        onPress={() => setRadio('seeker')}
      />
    </View>
  );
}

function SwitchDemo() {
  const { text } = useTpTheme();
  const [on, setOn] = useState(true);

  return (
    <View style={styles.row}>
      <Text style={text.bodyLarge}>Notifications</Text>
      <View style={styles.flex} />
      <TpSwitch value={on} onChanged={setOn} />
    </View>
  );
}

function OtpDemo() {
  const [otp, setOtp] = useState('');

  return <TpOtpField value={otp} onChangeText={setOtp} />;
}

function DateDemo() {
  const [date, setDate] = useState<Date | undefined>();

  return <TpDateField label="Date" value={date} onChanged={setDate} />;
}

function SortDemo() {
  const [sort, setSort] = useState<TpSortDirection | null>('desc');

  return (
    <TpSortToggle
      value={sort}
      ascLabel="Date: Low to High"
      descLabel="Date: High to Low"
      onChanged={setSort}
    />
  );
}

function NavigationDemo() {
  const { colors } = useTpTheme();

  return (
    <View>
      <GallerySection title="Page header">
        <TpPageHeader
          title="Account settings"
          subtitle="Password, notifications, and more"
          backTooltip="Back"
          onBack={() => undefined}
        />
      </GallerySection>
      <GallerySection title="Header tabs">
        <TabsDemo />
      </GallerySection>
      <GallerySection title="Back on media">
        <View
          style={{
            backgroundColor: colors.surfaceCream,
            padding: tpSpacing.md,
            alignItems: 'flex-start',
          }}
        >
          <TpBackButtonOnMedia tooltip="Back" onPress={() => undefined} />
        </View>
      </GallerySection>
    </View>
  );
}

function TabsDemo() {
  const [tab, setTab] = useState('a');
  const [listing, setListing] = useState('a');

  return (
    <View>
      <TpHeaderTabs
        selectedId={listing}
        mode="listing"
        onSelected={setListing}
        tabs={[
          { id: 'a', label: 'Services' },
          { id: 'b', label: 'Tasks' },
          { id: 'c', label: 'Professionals' },
        ]}
      />
      <View style={styles.mdGap} />
      <TpHeaderTabs
        title="Listings"
        selectedId={tab}
        backTooltip="Back"
        onBack={() => undefined}
        onSelected={setTab}
        tabs={[
          { id: 'a', label: 'Services' },
          { id: 'b', label: 'People' },
        ]}
      />
      <View style={styles.mdGap} />
      <TpHeaderTabs
        title="Link tabs"
        mode="links"
        selectedId={tab}
        showBack={false}
        tabs={[
          { id: 'a', label: 'Overview' },
          { id: 'b', label: 'Details' },
        ]}
        onSelected={setTab}
      />
    </View>
  );
}

function OverlaysDemo() {
  return (
    <View>
      <GallerySection title="Alerts">
        <AlertDemo />
      </GallerySection>
      <GallerySection title="Sheet, confirm, snackbar">
        <OverlayDemo />
      </GallerySection>
    </View>
  );
}

function EmptyErrorDemo() {
  return (
    <View>
      <GallerySection title="Empty">
        <TpStatusPage
          illustration="noResults"
          title="No services found at the moment."
          message="It seems there are no active services available right now. Try refreshing the page or check back later."
          actionLabel="Browse Services"
          onAction={() => undefined}
        />
      </GallerySection>
      <GallerySection title="Error / not found">
        <TpStatusPage
          variant="error"
          illustration="notFound"
          title="Service not found"
        />
        <TpStatusPage
          variant="error"
          illustration="error"
          title="Something went wrong"
        />
      </GallerySection>
    </View>
  );
}

function AlertDemo() {
  return (
    <View>
      <TpAlert message="Info alert that can be dismissed." />
      <TpAlert message="Something went wrong. Try again." severity="error" />
      <TpAlert
        message="Saved successfully."
        severity="success"
        dismissible={false}
      />
      <TpAlert
        message="This banner hides after a few seconds."
        closeTooltip="Dismiss"
        duration={8000}
      />
    </View>
  );
}

function OverlayDemo() {
  const { text } = useTpTheme();

  return (
    <View style={styles.wrap}>
      <TpButton
        label="Sheet"
        onPress={() => {
          showTpBottomSheet({
            children: (
              <View style={{ padding: tpSpacing.md }}>
                <Text style={text.bodyLarge}>Shared bottom sheet.</Text>
              </View>
            ),
          });
        }}
      />
      <TpButton
        label="Confirm"
        variant="outlined"
        onPress={() => {
          TpConfirmSheet.show({
            title: 'Delete item?',
            message: 'This cannot be undone.',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            destructive: true,
          });
        }}
      />
      <TpButton
        label="Snackbar"
        variant="outlined"
        onPress={() => {
          TpSnackbar.show({
            message: 'Changes saved',
            tone: 'success',
          });
        }}
      />
    </View>
  );
}

function LoaderDemo() {
  return (
    <GallerySection title="Spinner">
      <View style={styles.spinnerRow}>
        <TpSpinner />
        <TpSpinner size={32} />
        <TpSpinner size={40} color={tpColors.primary} />
        <TpSpinner size={20} color={tpColors.error} />
      </View>
    </GallerySection>
  );
}

function ContentDemo() {
  return (
    <View>
      <GallerySection title="Avatar, rating, badge, chip">
        <View style={styles.row}>
          <TpAvatar initials="TP" size={44} />
          <View style={styles.smWidth} />
          <TpVerificationBadge verified />
          <View style={styles.smWidth} />
          <TpNotificationBadge count={3}>
            <TpGlyph name="notifications" />
          </TpNotificationBadge>
        </View>
        <View style={styles.smGap} />
        <TpRating value={4} />
        <View style={styles.smGap} />
        <TpChip label="Service Provider" variant="assist" />
        <View style={styles.mdGap} />
        <View style={styles.wrap}>
          <TpSvgIcon source={tpAssets.iconHome} semanticLabel="Home" />
          <TpSvgIcon source={tpAssets.iconFilter} semanticLabel="Filter" />
        </View>
      </GallerySection>
      <GallerySection title="Image">
        <ImageDemo />
      </GallerySection>
      <GallerySection title="Status">
        <StatusDemo />
      </GallerySection>
      <GallerySection title="Divider">
        <TpDivider />
        <View style={styles.mdGap} />
        <TpDivider variant="band" />
      </GallerySection>
      <GallerySection title="Pagination">
        <PaginationDemo />
      </GallerySection>
    </View>
  );
}

function ImageDemo() {
  return (
    <View>
      <TpImage.Asset source={tpAssets.empty} width={160} />
      <View style={styles.mdGap} />
      <View style={styles.row}>
        <TpImage.Network
          uri=""
          width={80}
          height={80}
          semanticLabel="Provider"
          fallback="avatar"
        />
        <View style={styles.smWidth} />
        <TpImage.Network
          uri=""
          width={120}
          height={80}
          semanticLabel="Checking"
        />
      </View>
    </View>
  );
}

function StatusDemo() {
  return (
    <View style={styles.wrap}>
      <TpStatusBadge label="Initial" tone="info" />
      <TpStatusBadge label="In Negotiation" tone="warning" />
      <TpStatusBadge label="Approved" tone="primary" />
      <TpStatusBadge label="In Progress" tone="inProgress" />
      <TpStatusBadge label="Completed" tone="success" />
      <TpStatusBadge label="Terminated" tone="danger" />
      <TpStatusBadge label="Draft" tone="neutral" />
    </View>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(2);

  return (
    <TpPagination
      currentPage={page}
      totalPages={5}
      previousLabel="Previous"
      nextLabel="Next"
      onPrevious={() => setPage(value => value - 1)}
      onNext={() => setPage(value => value + 1)}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tpSpacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tpSpacing.xs,
  },
  spinnerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 24,
  },
  mdGap: {
    height: tpSpacing.md,
  },
  smGap: {
    height: tpSpacing.sm,
  },
  xsGap: {
    height: 8,
  },
  smWidth: {
    width: tpSpacing.sm,
  },
});
