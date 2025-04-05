import React from 'react';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
export default function LandingPage() {
    return(
        <SafeAreaProvider>
            <PaperProvider>
                <div>
                    
                </div>
            </PaperProvider>
        </SafeAreaProvider>
    )
}