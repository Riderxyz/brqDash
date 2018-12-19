SELECT * FROM Vw_WorkItem i inner join dbo.WorkItem w on w.WorkItemID = i.WorkItemID
where LOWER(i.Status) in ('em analise fornecedor','em estimativa adicional','em estimativa','em desenvolvimento') and
	case 
		when i.status = 'em analise' then
			w.DataFim_SLA_Analise_TFS
		when i.status = 'em estimativa' then
			w.DataFim_SLA_Dimensionamento_Calculada
		when i.status = 'em estimativa adicional' then
			w.DataFim_SLA_Analise_TFS
	when i.status = 'Em desenvolvimento' then
		w.DataEntrega
	end > getdate()
	ORDER BY w.analistaONS