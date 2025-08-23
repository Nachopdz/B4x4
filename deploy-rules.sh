#!/bin/bash

echo "Desplegando reglas de seguridad de Firebase..."
echo

echo "1. Desplegando reglas de Firestore..."
firebase deploy --only firestore:rules

echo
echo "2. Desplegando reglas de Storage..."
firebase deploy --only storage

echo
echo "Despliegue completado!"
