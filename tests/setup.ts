import { mock } from 'bun:test'

// Bun exercises server modules directly, outside Next's react-server resolver.
// Next still enforces the real marker when building client import graphs.
mock.module('server-only', () => ({}))
