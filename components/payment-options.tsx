"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, Building2, Truck, Shield } from 'lucide-react';
import { UnifiedPaymentService, PaymentMethod } from '@/lib/unified-payments';

interface PaymentOptionsProps {
  selectedMethod: string;
  onMethodChange: (method: string) => void;
  formData: any;
  onFormDataChange: (data: any) => void;
}

export default function PaymentOptions({ selectedMethod, onMethodChange, formData, onFormDataChange }: PaymentOptionsProps) {
  const [availableMethods] = useState(UnifiedPaymentService.getAvailablePaymentMethods());

  const handleMethodChange = (method: string) => {
    onMethodChange(method);
  };

  const handleFormDataChange = (field: string, value: any) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Payment Method</h3>
      
      <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="space-y-4">
        {availableMethods.map((method) => (
          <Card key={method.id} className={`cursor-pointer transition-all duration-300 ${
            selectedMethod === method.id 
              ? 'border-primary shadow-lg bg-primary/5' 
              : 'border-gray-200 hover:border-gray-300'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <RadioGroupItem value={method.id} id={method.id} className="text-primary" />
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <div>
                      <Label htmlFor={method.id} className="text-lg font-semibold text-gray-800 cursor-pointer">
                        {method.name}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Fee: {method.fees === 0 ? 'Free' : `LKR ${method.fees}`}</span>
                        <span>•</span>
                        <span>{method.processingTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>

      {/* Payment Method Specific Forms */}
      {selectedMethod === 'cod' && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>Cash on Delivery Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deliveryDate" className="text-sm font-medium text-gray-700">
                  Preferred Delivery Date
                </Label>
                <Input
                  type="date"
                  id="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={(e) => handleFormDataChange('deliveryDate', e.target.value)}
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="timeSlot" className="text-sm font-medium text-gray-700">
                  Time Slot
                </Label>
                <Select 
                  value={formData.timeSlot} 
                  onValueChange={(value) => handleFormDataChange('timeSlot', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 3:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (3:00 PM - 6:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Cash on Delivery incurs a LKR 200 delivery fee. 
                Payment is made in cash when your order is delivered.
              </p>
            </div>
          </CardContent>
        </Card>
      )}


      {/* Security Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-gray-800">Secure Payment</h4>
            <p className="text-sm text-gray-600 mt-1">
              All payment methods are secure and your information is protected. 
              We never store your payment details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
