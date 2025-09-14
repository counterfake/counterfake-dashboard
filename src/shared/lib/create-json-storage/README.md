# JSON Storage Utility

A lightweight utility for managing JSON data in the browser's localStorage.

## Overview

The `createJSONStorage` utility provides a simple and type-safe way to store, retrieve, and manage JSON data in the browser's localStorage. It handles serialization and deserialization of JSON data automatically and provides a clean API for interacting with stored data.

## Features

- Type-safe storage operations with TypeScript generics
- Automatic JSON serialization and deserialization
- Simple API with get, set, and remove operations
- Default value support when no data exists

## Usage

```typescript
import { createJSONStorage } from "@shared/lib/create-json-storage";

// Define your data type
interface UserPreferences {
  theme: "light" | "dark";
  notifications: boolean;
  language: string;
}

// Create a storage instance with a key and initial value
const preferencesStorage = createJSONStorage<UserPreferences>(
  "user-preferences",
  {
    theme: "light",
    notifications: true,
    language: "en",
  }
);

// Get the stored data
const preferences = preferencesStorage.getItem();

// Update the stored data
preferencesStorage.setItem({
  ...preferences,
  theme: "dark",
});

// Remove the stored data
preferencesStorage.removeItem();
```

## API Reference

### `createJSONStorage<T>(key: string, initialValue: T)`

Creates a new JSON storage utility.

#### Parameters

- `key` (string): The key under which the data will be stored in localStorage
- `initialValue` (T): The default value to use when no data exists in storage

#### Returns

An object with the following methods:

- `getItem(): T | null` - Retrieves the stored data
- `setItem(value: T): void` - Updates the stored data
- `removeItem(): void` - Removes the stored data

## Notes

- The utility is designed to work in both browser and server environments (checks for `window` availability)
- Initial value is automatically stored when creating a new storage instance
- All data is automatically serialized to JSON when storing and deserialized when retrieving
