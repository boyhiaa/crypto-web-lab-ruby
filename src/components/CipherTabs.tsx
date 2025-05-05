
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VigenereCipher from './VigenereCipher';
import AutoKeyVigenere from './AutoKeyVigenere';
import ExtendedVigenere from './ExtendedVigenere';
import PlayfairCipher from './PlayfairCipher';
import AffineCipher from './AffineCipher';
import HillCipher from './HillCipher';
import SuperEncryption from './SuperEncryption';

const CipherTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("vigenere");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-7 w-full mb-6">
        <TabsTrigger value="vigenere">Vigenere</TabsTrigger>
        <TabsTrigger value="autokey">Auto-Key</TabsTrigger>
        <TabsTrigger value="extended">Extended</TabsTrigger>
        <TabsTrigger value="playfair">Playfair</TabsTrigger>
        <TabsTrigger value="affine">Affine</TabsTrigger>
        <TabsTrigger value="hill">Hill</TabsTrigger>
        <TabsTrigger value="super">Super</TabsTrigger>
      </TabsList>
      
      <TabsContent value="vigenere">
        <VigenereCipher />
      </TabsContent>
      
      <TabsContent value="autokey">
        <AutoKeyVigenere />
      </TabsContent>
      
      <TabsContent value="extended">
        <ExtendedVigenere />
      </TabsContent>
      
      <TabsContent value="playfair">
        <PlayfairCipher />
      </TabsContent>
      
      <TabsContent value="affine">
        <AffineCipher />
      </TabsContent>
      
      <TabsContent value="hill">
        <HillCipher />
      </TabsContent>
      
      <TabsContent value="super">
        <SuperEncryption />
      </TabsContent>
    </Tabs>
  );
};

export default CipherTabs;
