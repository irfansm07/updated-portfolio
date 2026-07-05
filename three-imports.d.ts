declare module 'three/examples/jsm/postprocessing/EffectComposer' {
  import { WebGLRenderer, WebGLRenderTarget } from 'three';
  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    renderToScreen: boolean;
    passes: any[];
    addPass(pass: any): void;
    insertPass(pass: any, index: number): void;
    removePass(pass: any): void;
    render(deltaTime?: number): void;
    setSize(width: number, height: number): void;
    setPixelRatio(pixelRatio: number): void;
  }
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
  import { Scene, Camera, Material } from 'three';
  export class RenderPass {
    constructor(scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: any, clearAlpha?: any);
    scene: Scene;
    camera: Camera;
    overrideMaterial: Material;
    clear: boolean;
    clearDepth: boolean;
    clearStencil: boolean;
    needsSwap: boolean;
    enabled: boolean;
  }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
  import { Vector2 } from 'three';
  export class UnrealBloomPass {
    constructor(resolution: Vector2, strength?: number, radius?: number, threshold?: number);
    resolution: Vector2;
    strength: number;
    radius: number;
    threshold: number;
    needsSwap: boolean;
    enabled: boolean;
  }
}
