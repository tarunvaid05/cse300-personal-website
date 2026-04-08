"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: false };
  }

  componentDidCatch(error: Error) {
    // Ignore Next.js router initialization errors during HMR
    if (error.message.includes("Router action dispatched before initialization")) {
      return;
    }
    console.error(error);
  }

  render() {
    return this.props.children;
  }
}
