import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileCheck, 
  Upload, 
  Eye, 
  Calculator, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Building2,
  DollarSign
} from 'lucide-react';

export interface NablEscalationItem {
  id: string;
  gate_pass_code: string;
  dispute_reason: string;
  origin_moisture: number;
  destination_moisture: number;
  deviation_pct: number;
  referee_lab: string;
  escalation_status: 'REFEREE_TEST_PENDING' | 'RESULT_VERIFIED' | 'RESOLVED';
  nabl_certificate_url?: string;
  original_escrow_amount: number;
  recalculated_escrow_amount?: number;
  created_at: string;
}

interface NablEscalationsWidgetProps {
  escalations?: NablEscalationItem[];
  onTriggerEscalation?: (item: Partial<NablEscalationItem>) => void;
}

const defaultEscalations: NablEscalationItem[] = [
  {
    id: 'nabl-1',
    gate_pass_code: 'GP-MP09-8841',
    dispute_reason: 'Destination moisture deviation exceeds 1.5% dispute threshold (Origin 12.1% vs Dest 14.2%)',
    origin_moisture: 12.1,
    destination_moisture: 14.2,
    deviation_pct: 2.1,
    referee_lab: 'SGS India Pvt Ltd (NABL Accredited)',
    escalation_status: 'REFEREE_TEST_PENDING',
    original_escrow_amount: 408000.0,
    created_at: '2026-09-04 10:15 AM'
  },
  {
    id: 'nabl-2',
    gate_pass_code: 'GP-PB11-0982',
    dispute_reason: 'Moisture dispute re-analyzed by referee laboratory',
    origin_moisture: 11.9,
    destination_moisture: 13.8,
    deviation_pct: 1.9,
    referee_lab: 'NCML Quality Testing Labs (NABL)',
    escalation_status: 'RESULT_VERIFIED',
    nabl_certificate_url: '/docs/NABL_Cert_SGS_98421.pdf',
    original_escrow_amount: 412800.0,
    recalculated_escrow_amount: 396288.0, // 4% penalty applied
    created_at: '2026-09-02 02:30 PM'
  }
];

export const NablEscalationsWidget: React.FC<NablEscalationsWidgetProps> = ({
  escalations: customEscalations
}) => {
  const [items, setItems] = useState<NablEscalationItem[]>(customEscalations || defaultEscalations);
  const [selectedCertPdf, setSelectedCertPdf] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const handleSimulateCertificateUpload = (item: NablEscalationItem) => {
    setUploadingId(item.id);
    setTimeout(() => {
      // Calculate verified moisture deduction (e.g. 1% deduction per 0.5% moisture excess over 12.0%)
      const verifiedMoisture = 13.5;
      const excess = Math.max(0, verifiedMoisture - 12.0);
      const penaltyPct = (excess / 0.5) * 0.01;
      const recalculated = item.original_escrow_amount * (1 - penaltyPct);

      setItems(prev => prev.map(esc => {
        if (esc.id === item.id) {
          return {
            ...esc,
            escalation_status: 'RESULT_VERIFIED',
            destination_moisture: verifiedMoisture,
            nabl_certificate_url: `/docs/NABL_Official_Cert_${esc.gate_pass_code}.pdf`,
            recalculated_escrow_amount: Math.round(recalculated)
          };
        }
        return esc;
      }));
      setUploadingId(null);
      alert(`Official NABL Lab Certificate uploaded! Verified moisture ${verifiedMoisture}%. Escrow recalculated from ₹${item.original_escrow_amount.toLocaleString('en-IN')} to ₹${Math.round(recalculated).toLocaleString('en-IN')}.`);
    }, 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-100 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">NABL Quality Dispute Escalations & Audit Log</h2>
            <p className="text-xs text-slate-400">
              Independent referee lab certificates (SGS/EFRAC/NCML) and automated escrow adjustment engine.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-full text-xs font-semibold self-start sm:self-auto">
          Clause 3.1 Dispute Threshold Active
        </span>
      </div>

      {/* Audit Log Cards */}
      <div className="space-y-4">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-5 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl space-y-4 transition-all"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-amber-400 px-2 py-0.5 bg-amber-950/60 border border-amber-800 rounded">
                  {item.gate_pass_code}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 mr-1" />
                  {item.referee_lab}
                </span>
              </div>

              {item.escalation_status === 'REFEREE_TEST_PENDING' ? (
                <span className="flex items-center space-x-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-semibold">
                  <Clock className="w-3 h-3 animate-spin" />
                  <span>Referee Test Pending</span>
                </span>
              ) : (
                <span className="flex items-center space-x-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>NABL Result Verified</span>
                </span>
              )}
            </div>

            {/* Dispute details */}
            <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <strong className="text-rose-400">Dispute Trigger: </strong>
              {item.dispute_reason}
            </p>

            {/* Variance & Escrow Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Origin Moisture</span>
                <span className="font-bold text-blue-400">{item.origin_moisture}%</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Destination Moisture</span>
                <span className="font-bold text-rose-400">{item.destination_moisture}%</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Original Escrow Payout</span>
                <span className="font-bold text-slate-200">₹{item.original_escrow_amount.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-800">
                <span className="text-slate-500 block">Recalculated Escrow</span>
                {item.recalculated_escrow_amount ? (
                  <span className="font-extrabold text-emerald-400">₹{item.recalculated_escrow_amount.toLocaleString('en-IN')}</span>
                ) : (
                  <span className="text-slate-500 italic">Pending Lab Test</span>
                )}
              </div>
            </div>

            {/* Certificate Action */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-500">Log Timestamp: {item.created_at}</span>

              {item.escalation_status === 'RESULT_VERIFIED' ? (
                <button
                  onClick={() => alert(`Opening official NABL Lab Certificate for ${item.gate_pass_code}...`)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 rounded-lg font-semibold transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>View NABL Lab Cert (PDF)</span>
                </button>
              ) : (
                <button
                  onClick={() => handleSimulateCertificateUpload(item)}
                  disabled={uploadingId === item.id}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold shadow-md transition-all"
                >
                  {uploadingId === item.id ? (
                    <>
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying PDF...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload NABL Certificate</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default NablEscalationsWidget;
