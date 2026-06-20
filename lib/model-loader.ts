"use client";

/**
 * Configures a GLTFLoader to decode the OPTIMIZED toilet models, which use:
 *   - EXT_meshopt_compression   (geometry)  -> MeshoptDecoder
 *   - KHR_texture_basisu / KTX2  (textures)  -> KTX2Loader
 *   - (optionally) KHR_draco_mesh_compression -> DRACOLoader
 *
 * The stock GLTFLoader in the original service-model.tsx does NOT set these up,
 * so the optimized .glb files fail to load. Always load through this helper.
 *
 * KTX2 needs the Basis transcoder files. Copy them into /public/basis/ once:
 *   cp node_modules/three/examples/jsm/libs/basis/* public/basis/
 * (basis_transcoder.js + basis_transcoder.wasm)
 */
import type { WebGLRenderer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

let ktx2Singleton: KTX2Loader | null = null;
let dracoSingleton: DRACOLoader | null = null;

/** Pass this as the 3rd arg to useLoader(GLTFLoader, url, configureGLTFLoader(gl)). */
export function configureGLTFLoader(gl: WebGLRenderer) {
  return (loader: GLTFLoader) => {
    if (!ktx2Singleton) {
      ktx2Singleton = new KTX2Loader()
        .setTranscoderPath("/basis/")
        .detectSupport(gl);
    }
    if (!dracoSingleton) {
      dracoSingleton = new DRACOLoader().setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
      );
    }
    loader.setKTX2Loader(ktx2Singleton);
    loader.setDRACOLoader(dracoSingleton);
    loader.setMeshoptDecoder(MeshoptDecoder);
  };
}
