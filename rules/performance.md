# Performance

Load when building lists, images, navigation, parsing, or anything that runs often (render, scroll, startup).

**Why:** Cost is a design input. Do not micro-optimize literals; do not ship `O(n)` work in render because “we can profile later.”

## JS thread

Render composes views and returns. No I/O, decode, or filtering of large lists inside the component body.

```tsx
// bad
function BookingList({ allBookings }: Props) {
  const sorted = allBookings.filter(b => b.active).sort();
  return (
    <View>
      {sorted.map(b => (
        <BookingRow key={b.id} booking={b} />
      ))}
    </View>
  );
}

// good - filter outside render; lazy list
<FlatList
  data={bookings}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <BookingRow booking={item} />}
/>
```

Memoize only when a child actually re-renders too often. Split so only the part that changes updates (`useState` at the leaf). Tear down listeners, timers, animations, and overlay entries - [memory.md](memory.md). `TpSnackbar` already guards double-remove. `OverlayHost` is the one process-wide overlay list - do not allocate a second portal.

## Lists, images, network

Paginate when the API paginates. `TpPagination` is previous/next and hides itself when `totalPages <= 1` (`TpPagination.tsx`). Do not fetch every page eagerly.

Images: pass layout width/height to `TpImage`. Decode size and aspect live in `tpImageCache.prepare` - not in the view. Do not add an image package. Skip unusable URLs. SVGs through `TpSvgIcon`. Precache only when the next screen will show the same bytes immediately.

Network: one in-flight request per user intent unless the product needs parallel independent resources. Timeouts, reuse, and cancel: [network.md](network.md). Do not fetch in render or refresh on every re-render. Parse once at the boundary.

## Startup

`src/main.tsx` stays small - no unused native modules “for later.” The gallery index does not import the kit barrel; demos load through `React.lazy` in `galleryDemos.tsx` so datetime picker and illustration screens stay off the first paint. Product screens must not mount the entire kit. Flatten wrappers that allocate animations or listeners for no behavior. Metro `inlineRequires` is on so deferred modules are not evaluated until first use.

If a change can hitch a 360dp scroll, fix it before calling the work done ([core.md](core.md)).
