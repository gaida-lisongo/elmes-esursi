import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Set vfs for fonts
if (typeof window !== "undefined") {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake?.vfs || (pdfFonts as any).vfs;
}

export const generateParcoursPDF = (data: any) => {
    const { etudiant, programme, etablissement, annee, orderNumber, amount, currency } = data;

    const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],
        content: [
            // Header Section
            {
                columns: [
                    {
                        width: '*',
                        stack: [
                            { text: 'ESURSI', style: 'brand' },
                            { text: 'Système National d\'Orientation', style: 'brandSub' },
                        ]
                    },
                    {
                        width: 'auto',
                        stack: [
                            { text: 'RÉCEPISSÉ D\'INSCRIPTION', style: 'docTitle', alignment: 'right' },
                            { text: `N° ${orderNumber || '---'}`, style: 'docRef', alignment: 'right' },
                            { text: `Date: ${new Date().toLocaleDateString('fr-FR')}`, style: 'docDate', alignment: 'right' },
                        ]
                    }
                ]
            },
            { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 515, y2: 10, lineWidth: 2, lineColor: '#006bff' }] },
            { text: ' ', margin: [0, 20] },

            // Main Info - 2 Columns
            {
                columns: [
                    {
                        width: '50%',
                        stack: [
                            { text: 'INFORMATIONS ÉTUDIANT', style: 'sectionHeader' },
                            {
                                margin: [0, 10, 0, 20],
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        [{ text: 'Nom:', style: 'label' }, { text: `${etudiant?.nom} ${etudiant?.postNom} ${etudiant?.prenom}`, style: 'value' }],
                                        [{ text: 'Sexe:', style: 'label' }, { text: etudiant?.sexe || '---', style: 'value' }],
                                        [{ text: 'Email:', style: 'label' }, { text: etudiant?.email || '---', style: 'value' }],
                                        [{ text: 'Tél:', style: 'label' }, { text: etudiant?.telephone || '---', style: 'value' }],
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    },
                    {
                        width: '50%',
                        stack: [
                            { text: 'PROGRAMME ACADÉMIQUE', style: 'sectionHeader' },
                            {
                                margin: [0, 10, 0, 20],
                                table: {
                                    widths: ['auto', '*'],
                                    body: [
                                        [{ text: 'Institution:', style: 'label' }, { text: etablissement?.designation || etablissement?.nom || '---', style: 'value' }],
                                        [{ text: 'Mention:', style: 'label' }, { text: programme?.designation || '---', style: 'value' }],
                                        [{ text: 'Année:', style: 'label' }, { text: `${annee?.debut}-${annee?.fin}`, style: 'value' }],
                                        [{ text: 'Province:', style: 'label' }, { text: etablissement?.province?.designation || '---', style: 'value' }],
                                    ]
                                },
                                layout: 'noBorders'
                            }
                        ]
                    }
                ]
            },

            // Payment Status Card
            {
                margin: [0, 20],
                table: {
                    widths: ['*'],
                    body: [
                        [{
                            stack: [
                                { text: 'STATUT DE PAIEMENT', style: 'cardTitle' },
                                {
                                    columns: [
                                        { text: 'Frais de traitement du dossier', style: 'cardLabel' },
                                        { text: `${amount.toLocaleString()} ${currency}`, style: 'cardValue', alignment: 'right' }
                                    ]
                                },
                                { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 435, y2: 10, lineWidth: 1, lineColor: '#eeeeee' }] },
                                {
                                    columns: [
                                        { text: 'Statut du paiement', style: 'cardLabel', margin: [0, 15, 0, 0] },
                                        { text: 'CONFIRMÉ', style: 'statusSuccess', alignment: 'right', margin: [0, 15, 0, 0] }
                                    ]
                                }
                            ],
                            padding: [20, 20, 20, 20]
                        }]
                    ]
                },
                layout: {
                    fillColor: '#f8fafc',
                    hLineWidth: () => 1,
                    vLineWidth: () => 1,
                    hLineColor: () => '#e2e8f0',
                    vLineColor: () => '#e2e8f0',
                }
            },

            // Footer of first page
            { text: 'Ce document fait office de preuve officielle d\'inscription sous réserve de la validation physique de vos documents originaux.', style: 'footerNote', margin: [0, 40, 0, 0] },

            {
                columns: [
                    { qr: `https://esursi.cd/verify/${orderNumber}`, fit: 80, margin: [0, 20, 0, 0] },
                    {
                        text: 'Authenticité vérifiable en scannant ce code QR',
                        style: 'qrNote',
                        margin: [10, 45, 0, 0]
                    }
                ]
            },

            // PAGE 2
            { text: '', pageBreak: 'before' },
            { text: 'CONDITION ET ÉTAPES SUIVANTES', style: 'docTitle', margin: [0, 0, 0, 20] },
            {
                stack: [
                    { text: '1. Validation Physique du Dossier', style: 'subSectionTitle' },
                    { text: 'L\'étudiant est tenu de se présenter au service de scolarité de l\'établissement choisi muni de ce récepissé et des originaux des documents suivants :', margin: [0, 5, 0, 10] },
                    {
                        ul: [
                            'Diplôme d\'État (Original/Palmarès)',
                            'Bulletins des 5ème et 6ème humanités',
                            'Attestation de naissance ou Acte d\'état civil',
                            'Photos passeport récentes (4)',
                        ],
                        margin: [20, 0, 0, 20]
                    },

                    { text: '2. Carte d\'Étudiant', style: 'subSectionTitle' },
                    { text: 'Après validation physique du dossier par le service de scolarité, une carte d\'étudiant biométrique vous sera délivrée. Elle est strictement personnelle et obligatoire pour l\'accès aux auditoires et aux sessions d\'examens.', margin: [0, 5, 0, 20] },

                    { text: '3. Plateforme Numérique', style: 'subSectionTitle' },
                    { text: 'Vos identifiants de connexion personnalisés au portail étudiant (E-Scolarité) vous seront envoyés par email dès la validation définitive de votre inscription par le secrétariat général académique.', margin: [0, 5, 0, 20] },

                    { text: '4. Règlement Intérieur', style: 'subSectionTitle' },
                    { text: 'En procédant à cette inscription, l\'étudiant s\'engage à respecter scrupuleusement le règlement intérieur de l\'établissement ainsi que les lois de la République Régissant l\'Enseignement Supérieur et Universitaire.', margin: [0, 5, 0, 20] },
                ],
                style: 'terms'
            },
            {
                margin: [0, 50, 0, 0],
                table: {
                    widths: ['*', '*'],
                    body: [
                        [
                            { text: 'Signature de l\'étudiant', alignment: 'center', style: 'signLabel' },
                            { text: 'Sceau de l\'institution', alignment: 'center', style: 'signLabel' }
                        ],
                        [
                            { text: '\n\n\n__________________________', alignment: 'center' },
                            { text: '\n\n\n__________________________', alignment: 'center' }
                        ]
                    ]
                },
                layout: 'noBorders'
            }
        ],
        styles: {
            brand: { fontSize: 24, bold: true, color: '#006bff' },
            brandSub: { fontSize: 10, color: '#64748b', margin: [0, -5, 0, 0] },
            docTitle: { fontSize: 16, bold: true, color: '#1e293b' },
            docRef: { fontSize: 12, color: '#64748b' },
            docDate: { fontSize: 10, color: '#94a3b8' },
            sectionHeader: { fontSize: 12, bold: true, color: '#006bff', margin: [0, 0, 0, 5] },
            label: { fontSize: 10, color: '#64748b' },
            value: { fontSize: 10, bold: true, color: '#1e293b' },
            cardTitle: { fontSize: 12, bold: true, color: '#1e293b', margin: [0, 0, 0, 10] },
            cardLabel: { fontSize: 11, color: '#64748b' },
            cardValue: { fontSize: 14, bold: true, color: '#006bff' },
            statusSuccess: { fontSize: 12, bold: true, color: '#10b981' },
            footerNote: { fontSize: 9, color: '#94a3b8', italic: true },
            qrNote: { fontSize: 9, color: '#64748b' },
            subSectionTitle: { fontSize: 13, bold: true, color: '#1e293b', margin: [0, 10, 0, 0] },
            terms: { fontSize: 10, color: '#334155', lineHeight: 1.4 },
            signLabel: { fontSize: 10, bold: true, color: '#64748b' }
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };

    pdfMake.createPdf(docDefinition).download(`ESURSI_RECU_${orderNumber}.pdf`);
};
