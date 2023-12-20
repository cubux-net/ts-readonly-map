# Changelog

## 2.0.1 (2023-12-21)

- Fix: `updateDefault()` since `1.2.0` in some cases could inference unnecessary
  annoying `V | D` in untyped callback param even when `D` is already a subtype
  of `V`. See test cases for details.

## 2.0.0 (2023-12-14)

- **BREAKING**: Drop Node < 18.
- **BREAKING**: Add `typescript` from 3 to 5 to optional `peerDependencies`.

## 1.2.0 (2023-12-14)

- Add: `updateDefault()` now allows different type for `default` value.

## 1.1.1 (2022-09-15)

- Fix: `fromArray()` was not exported.

## 1.1.0 (2022-09-15)

- Add: `fromArray()`.

## 1.0.0 (2022-06-27)

- Initial release.
