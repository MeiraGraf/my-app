import * as registerQuery from "query-registry";
import { PackageNodeInfo } from "./Types";
import { useCallback, useState } from "react";

export const getNpmData = async (
  packageName: string
): Promise<PackageNodeInfo | undefined> => {
  try {
    const { dependencies, description } =
      await registerQuery.getRawPackageManifest({
        name: packageName,
      });
    return { dependencies, description };
  } catch (error) {
    window.alert("An error occurred fetching data - see logs for more info.");
    console.error(error);
  }
};

/*const axios = require('axios').default;
export async function getNpmPackages(PACKAGE_NAME: string) {
   const response = axios.get(`https://registry.npmjs.org/${PACKAGE_NAME}`)
   console.log(response);
    
    /*.then(function (response: any) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
    

}*/
