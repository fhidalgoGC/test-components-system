import type { HeterogeneousListProps } from '../types';

export class ValidationError extends Error {
  constructor(message: string, public suggestion?: string) {
    super(message);
    this.name = 'HeterogeneousListValidationError';
  }
}

export function validateProps(props: HeterogeneousListProps): void {
  const { mode } = props;

  // Check for conflicting loaders
  if ('dataLoader' in props && props.dataLoader && 'elementsLoader' in props && props.elementsLoader) {
    throw new ValidationError(
      'Cannot use both dataLoader and elementsLoader simultaneously',
      'Choose either dataLoader (for registry/renderItem modes) or elementsLoader (for elements mode)'
    );
  }

  // Validate registry mode
  if (mode === 'registry') {
    const registryProps = props as any;
    
    if (!registryProps.registry) {
      throw new ValidationError(
        'mode="registry" requires a registry prop',
        'Provide a registry object mapping kindComponent to React components: registry={{ myType: MyComponent }}'
      );
    }

    if (!registryProps.items && !registryProps.dataLoader && !registryProps.initialItems) {
      throw new ValidationError(
        'mode="registry" requires either items, dataLoader, or initialItems',
        'Provide items array, a dataLoader function, or initialItems for the initial render'
      );
    }

    if (registryProps.elementsLoader) {
      throw new ValidationError(
        'mode="registry" cannot use elementsLoader',
        'Use dataLoader instead for loading items asynchronously'
      );
    }

    if (registryProps.elements) {
      throw new ValidationError(
        'mode="registry" cannot use elements prop',
        'Use items prop instead and provide a registry to map kindComponent to components'
      );
    }
  }

  // Validate renderItem mode
  if (mode === 'renderItem') {
    const renderProps = props as any;
    
    if (!renderProps.renderItem) {
      throw new ValidationError(
        'mode="renderItem" requires a renderItem function',
        'Provide a renderItem prop: renderItem={(item, index) => <YourComponent item={item} />}'
      );
    }

    if (!renderProps.items && !renderProps.dataLoader && !renderProps.initialItems) {
      throw new ValidationError(
        'mode="renderItem" requires either items, dataLoader, or initialItems',
        'Provide items array, a dataLoader function, or initialItems for the initial render'
      );
    }

    if (renderProps.elementsLoader) {
      throw new ValidationError(
        'mode="renderItem" cannot use elementsLoader',
        'Use dataLoader instead for loading items asynchronously'
      );
    }

    if (renderProps.registry) {
      throw new ValidationError(
        'mode="renderItem" cannot use registry prop',
        'Switch to mode="registry" if you need a registry, or remove the registry prop'
      );
    }

    if (renderProps.elements) {
      throw new ValidationError(
        'mode="renderItem" cannot use elements prop',
        'Use items prop instead and provide a renderItem function'
      );
    }
  }

  // Validate elements mode
  if (mode === 'elements') {
    const elementsProps = props as any;
    
    if (!elementsProps.elements && !elementsProps.elementsLoader && !elementsProps.initialElements) {
      throw new ValidationError(
        'mode="elements" requires either elements, elementsLoader, or initialElements',
        'Provide elements array, an elementsLoader function, or initialElements for the initial render'
      );
    }

    if (elementsProps.dataLoader) {
      throw new ValidationError(
        'mode="elements" cannot use dataLoader',
        'Use elementsLoader instead for loading pre-rendered elements'
      );
    }

    if (elementsProps.items) {
      throw new ValidationError(
        'mode="elements" cannot use items prop',
        'Switch to mode="registry" or mode="renderItem" if you need to work with items'
      );
    }

    if (elementsProps.registry) {
      throw new ValidationError(
        'mode="elements" cannot use registry prop',
        'Switch to mode="registry" if you need a registry'
      );
    }

    if (elementsProps.renderItem) {
      throw new ValidationError(
        'mode="elements" cannot use renderItem prop',
        'Switch to mode="renderItem" if you need a renderItem function'
      );
    }
  }

  // Validate divider
  if (props.dividerVariant === 'component' && !props.renderDivider) {
    throw new ValidationError(
      'dividerVariant="component" requires renderDivider function',
      'Provide renderDivider prop: renderDivider={(index) => <YourDivider />}'
    );
  }
}
